from pydantic import BaseModel


class PrescriptionRegister(BaseModel):
    appointment_id: str
    patient_id: str
    doctor_id: str
    medicine_name: str
    dosage: str
    frequency: str
    duration: str
    instructions: str | None = None