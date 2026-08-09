from pydantic import BaseModel

class AppointmentRegister(BaseModel):
    patient_id: str
    reason_for_visit: str
    service_priority: str
    special_care_category: str | None = None
    emergency_verification_status: str | None = "Not Applicable"
    department_id: str
    doctor_id: str
    appointment_date: str
    appointment_time: str
    status: str = "Pending"