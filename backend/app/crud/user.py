from sqlalchemy.orm import Session

from app.models.user import User
from app.schemas.user import UserCreate

from app.crud.role import get_role_by_name

from app.core.security import (
    hash_password,
    verify_password,
)


def get_user_by_email(db: Session, email: str) -> User | None:
    return db.query(User).filter(User.email == email).first()


def get_user_by_id(db: Session, user_id: int) -> User | None:
    return db.query(User).filter(User.id == user_id).first()


def get_all_users(db: Session) -> list[User]:
    return db.query(User).all()


def update_user_role(
    db: Session,
    user: User,
    role_id: int,
) -> User:
    user.role_id = role_id

    db.commit()
    db.refresh(user)

    return user


def delete_user(
    db: Session,
    user: User,
):
    db.delete(user)
    db.commit()


def create_user(db: Session, user: UserCreate) -> User:

    viewer_role = get_role_by_name(
        db,
        "Viewer",
    )

    if not viewer_role:
        raise ValueError(
            "Default Viewer role not found. Please seed the roles table."
        )

    db_user = User(
        full_name=user.full_name,
        email=user.email,
        hashed_password=hash_password(user.password),
        role_id=viewer_role.id,
    )

    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return db_user


def authenticate_user(
    db: Session,
    email: str,
    password: str,
) -> User | None:
    user = get_user_by_email(db, email)

    if not user:
        return None

    if not verify_password(password, user.hashed_password):
        return None

    return user