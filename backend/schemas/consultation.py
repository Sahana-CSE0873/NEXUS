from pydantic import BaseModel
from datetime import date, time


class ConsultationStart(BaseModel):
    appointment_id: str
    patient_id: str
    doctor_id: str


class ConsultationComplete(BaseModel):
    consultation_id: str
    diagnosis: str
    prescription: str
    doctor_notes: str