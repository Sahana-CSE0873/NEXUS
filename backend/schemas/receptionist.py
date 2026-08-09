from pydantic import BaseModel

class ReceptionistRegister(BaseModel):
    receptionist_name: str
    mobile_number: str
    password: str
    gender: str