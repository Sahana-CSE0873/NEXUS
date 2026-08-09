from pydantic import BaseModel


class DoctorPatients(BaseModel):
    doctor_id: str