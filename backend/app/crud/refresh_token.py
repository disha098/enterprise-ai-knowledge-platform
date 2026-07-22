from datetime import datetime, timezone

from sqlalchemy.orm import Session

from app.models.refresh_token import RefreshToken


def create_refresh_token(
    db: Session,
    token: str,
    user_id: int,
    expires_at: datetime,
) -> RefreshToken:
    refresh_token = RefreshToken(
        token=token,
        user_id=user_id,
        expires_at=expires_at,
    )

    db.add(refresh_token)
    db.commit()
    db.refresh(refresh_token)

    return refresh_token


def get_refresh_token(
    db: Session,
    token: str,
) -> RefreshToken | None:
    return (
        db.query(RefreshToken)
        .filter(RefreshToken.token == token)
        .first()
    )


def get_valid_refresh_token(
    db: Session,
    token: str,
) -> RefreshToken | None:
    return (
        db.query(RefreshToken)
        .filter(
            RefreshToken.token == token,
            RefreshToken.revoked.is_(False),
        )
        .first()
    )


def revoke_refresh_token(
    db: Session,
    refresh_token: RefreshToken,
) -> None:
    refresh_token.revoked = True
    db.commit()


def delete_expired_refresh_tokens(
    db: Session,
) -> int:
    deleted = (
        db.query(RefreshToken)
        .filter(
            RefreshToken.expires_at < datetime.now(timezone.utc)
        )
        .delete()
    )

    db.commit()

    return deleted