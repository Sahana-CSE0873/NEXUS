from pydantic import BaseModel


class BillingRegister(BaseModel):
    appointment_id: str
    patient_id: str
    doctor_id: str

    consultation_fee: float
    medicine_fee: float
    service_fee: float