from pydantic import BaseModel

class DoctorRegister(BaseModel):
    doctor_name: str
    mobile_number: str
    password: str
    gender: str
    specialization: str
    department_id: str
    experience_years: int