from pydantic import BaseModel

class QueueRegister(BaseModel):
    appointment_id: str
    department_id: str
    service_priority: str