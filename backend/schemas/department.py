from pydantic import BaseModel

class DepartmentRegister(BaseModel):
    department_name: str