import random

otp_storage = {}

def generate_otp(patient_id: str):
    otp = str(random.randint(100000, 999999))
    otp_storage[patient_id] = otp
    return otp

def verify_otp(patient_id: str, otp: str):
    if patient_id in otp_storage:
        if otp_storage[patient_id] == otp:
            del otp_storage[patient_id]
            return True
    return False