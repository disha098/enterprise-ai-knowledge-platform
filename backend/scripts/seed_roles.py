from sqlalchemy.orm import Session

from app.database.database import SessionLocal
from app.models.role import Role


def seed_roles(db: Session):
    roles = [
        {
            "name": "Admin",
            "description": "Full system access",
        },
        {
            "name": "Editor",
            "description": "Can upload and manage documents",
        },
        {
            "name": "Viewer",
            "description": "Can chat with documents",
        },
    ]

    for role_data in roles:
        existing = (
            db.query(Role)
            .filter(Role.name == role_data["name"])
            .first()
        )

        if not existing:
            db.add(Role(**role_data))

    db.commit()


if __name__ == "__main__":
    db = SessionLocal()
    try:
        seed_roles(db)
        print("✅ Roles seeded successfully.")
    finally:
        db.close()