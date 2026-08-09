from pydantic import BaseModel

class PatientLogin(BaseModel):
    patient_id: str
    password: str

class DoctorLogin(BaseModel):
    doctor_id: str
    password: str

class ReceptionistLogin(BaseModel):
    receptionist_id: str
    password: str

class AdminLogin(BaseModel):
    administrator_id: str
    password: str