from app.database.session import get_db
from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, HTTPException, status

from app.crud.user import (
    get_all_users,
    get_user_by_id,
    update_user_role,
    delete_user,
)

from app.schemas.user import (
    UserResponse,
    UpdateUserRole,
)

from app.crud.role import get_role_by_id
from app.api.dependencies import get_current_user
from app.core.permissions import require_roles
from app.models.user import User

router = APIRouter(
    prefix="/users",
    tags=["Users"],
)


@router.get(
    "/me",
    response_model=UserResponse,
)
def read_current_user(
    current_user: User = Depends(get_current_user),
):
    return current_user

@router.get(
    "/",
    response_model=list[UserResponse],
)
def read_all_users(
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_roles(["Admin"])
    ),
):
    return get_all_users(db)

@router.get(
    "/admin-test",
)
def admin_test(
    current_user: User = Depends(
        require_roles(["Admin"])
    ),
):
    return {
        "message": "Welcome Admin!",
        "user": current_user.full_name,
        "role": current_user.role.name,
    }

@router.patch(
    "/{user_id}/role",
    response_model=UserResponse,
)
def change_user_role(
    user_id: int,
    role_data: UpdateUserRole,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_roles(["Admin"])
    ),
):
    user = get_user_by_id(
        db,
        user_id,
    )

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )

    role = get_role_by_id(
        db,
        role_data.role_id,
    )

    if not role:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Role not found",
        )

    return update_user_role(
        db,
        user,
        role.id,
    )

@router.delete(
    "/{user_id}",
)
def remove_user(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_roles(["Admin"])
    ),
):
    user = get_user_by_id(
        db,
        user_id,
    )

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )

    if user.id == current_user.id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="You cannot delete your own account.",
        )

    delete_user(
        db,
        user,
    )

    return {
        "message": "User deleted successfully."
    }