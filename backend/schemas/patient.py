from pydantic import BaseModel

class PatientRegister(BaseModel):
    patient_name: str
    mobile_number: str
    password: str
    gender: str
    date_of_birth: str
    address: str