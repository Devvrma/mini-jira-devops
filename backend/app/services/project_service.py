from sqlalchemy.orm import Session
from app.models.project import Project
from app.schemas.project import ProjectCreate

def get_projects_by_user(db: Session, user_id: int):
    return db.query(Project).filter(Project.owner_id == user_id).all()

def create_project(db: Session, project: ProjectCreate, user_id: int):
    db_project = Project(**project.model_dump(), owner_id=user_id)
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    return db_project #cicdtesting 
