from sqlalchemy.orm import Session
from app.models.task import Task
from app.schemas.task import TaskCreate, TaskStatus

def get_tasks_by_project(db: Session, project_id: int):
    return db.query(Task).filter(Task.project_id == project_id).all()

def create_task(db: Session, task: TaskCreate, project_id: int):
    db_task = Task(**task.model_dump(), project_id=project_id)
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

def update_task_status(db: Session, task_id: int, status: TaskStatus):
    db_task = db.query(Task).filter(Task.id == task_id).first()
    if db_task:
        db_task.status = status
        db.commit()
        db.refresh(db_task)
    return db_task
