from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.schemas.refresh_token import (
    RefreshTokenRequest,
    LogoutRequest,
)

from fastapi.security import OAuth2PasswordRequestForm

from app.crud.refresh_token import (
    create_refresh_token as save_refresh_token,
    get_valid_refresh_token,
    revoke_refresh_token,
)

from datetime import datetime, timedelta, timezone

from app.core.config import settings
from app.core.security import (
    create_access_token,
    create_refresh_token,
)

from app.database.session import get_db

from app.crud.user import (
    authenticate_user,
    create_user,
    get_user_by_email,
)

from app.schemas.user import (
    UserCreate,
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
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
):
    user = authenticate_user(
        db,
        form_data.username,
        form_data.password,
    )

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # Create access token
    access_token = create_access_token(
        subject=user.id,
        expires_delta=timedelta(
            minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES,
        ),
    )

    # Create refresh token
    refresh_token = create_refresh_token()

    refresh_token_expiry = datetime.now(timezone.utc) + timedelta(
        days=settings.REFRESH_TOKEN_EXPIRE_DAYS,
    )

    # Save refresh token to database
    save_refresh_token(
        db=db,
        token=refresh_token,
        user_id=user.id,
        expires_at=refresh_token_expiry,
    )

    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer",
    }


@router.post(
    "/refresh",
    response_model=Token,
)
def refresh_access_token(
    request: RefreshTokenRequest,
    db: Session = Depends(get_db),
):
    refresh_token = get_valid_refresh_token(
        db,
        request.refresh_token,
    )

    if not refresh_token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid refresh token",
        )

    if refresh_token.expires_at < datetime.now(timezone.utc):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Refresh token has expired",
        )

    access_token = create_access_token(
        subject=refresh_token.user_id,
        expires_delta=timedelta(
            minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES,
        ),
    )

    return {
        "access_token": access_token,
        "refresh_token": request.refresh_token,
        "token_type": "bearer",
    }


@router.post("/logout")
def logout(
    request: LogoutRequest,
    db: Session = Depends(get_db),
):
    refresh_token = get_valid_refresh_token(
        db,
        request.refresh_token,
    )

    if not refresh_token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid refresh token",
        )

    revoke_refresh_token(
        db=db,
        refresh_token=refresh_token,
    )

    return {
        "message": "Logged out successfully"
    }