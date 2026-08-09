from pydantic import BaseModel

class MedicalHistoryRegister(BaseModel):
    appointment_id: str
    patient_id: str
    doctor_id: str
    diagnosis: str
    treatment: str | None = None
    allergies: str | None = None
    chronic_diseases: str | None = None
    notes: str | None = None