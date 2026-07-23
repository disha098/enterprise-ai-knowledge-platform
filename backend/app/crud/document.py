from sqlalchemy.orm import Session

from app.models.document import Document


def create_document(db: Session, **kwargs) -> Document:
    document = Document(**kwargs)

    db.add(document)
    db.commit()
    db.refresh(document)

    return document


def get_document_by_id(db: Session, document_id: int) -> Document | None:
    return (
        db.query(Document)
        .filter(Document.id == document_id)
        .first()
    )


def get_all_documents(db: Session) -> list[Document]:
    return (
        db.query(Document)
        .order_by(Document.uploaded_at.desc())
        .all()
    )


def delete_document(db: Session, document: Document) -> None:
    db.delete(document)
    db.commit()