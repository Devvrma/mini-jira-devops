from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.dependencies.auth import get_current_user
from app.models.user import User
from app.models.project import Project
from app.models.task import Task

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])

@router.get("/summary")
def get_dashboard_summary(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    projects_count = db.query(Project).filter(Project.owner_id == current_user.id).count()
    project_ids = [p.id for p in db.query(Project.id).filter(Project.owner_id == current_user.id).all()]
    
    todo_count = db.query(Task).filter(Task.project_id.in_(project_ids), Task.status == "TODO").count() if project_ids else 0
    progress_count = db.query(Task).filter(Task.project_id.in_(project_ids), Task.status == "IN_PROGRESS").count() if project_ids else 0
    done_count = db.query(Task).filter(Task.project_id.in_(project_ids), Task.status == "DONE").count() if project_ids else 0
    
    return {
        "total_projects": projects_count,
        "tasks_summary": {
            "todo": todo_count,
            "in_progress": progress_count,
            "done": done_count,
            "total_tasks": todo_count + progress_count + done_count
        }
    }
