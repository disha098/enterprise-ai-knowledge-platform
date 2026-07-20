from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from datetime import timedelta

from app.core.config import settings
from app.core.security import create_access_token

from app.database.session import get_db

from app.crud.user import (
    authenticate_user,
    create_user,
    get_user_by_email,
)

from app.schemas.user import (
    UserCreate,
    UserLogin,
    UserResponse,
)

from app.schemas.token import Token

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)


@router.post(
    "/register",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED,
)

def register_user(
    user: UserCreate,
    db: Session = Depends(get_db),
):
    existing_user = get_user_by_email(db, user.email)

    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered",
        )

    return create_user(db, user)

@router.post(
    "/login",
    response_model=Token,
)
def login_user(
    user_credentials: UserLogin,
    db: Session = Depends(get_db),
):
    user = authenticate_user(
        db,
        user_credentials.email,
        user_credentials.password,
    )

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    access_token = create_access_token(
        subject=user.id,
        expires_delta=timedelta(
            minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
        ),
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
    }