from fastapi import APIRouter
from db import get_connection
from schemas.login import (
    PatientLogin,
    DoctorLogin,
    ReceptionistLogin,
    AdminLogin
)

router = APIRouter(
    prefix="/login",
    tags=["Login"]
)


@router.post("/patient")
def patient_login(login: PatientLogin):

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT
            patient_id,
            patient_name
        FROM patient
        WHERE patient_id=%s
        AND password=%s
    """, (login.patient_id, login.password))

    patient = cursor.fetchone()

    cursor.close()
    conn.close()

    if patient:
        return {
            "message": "Patient Login Successful",
            "patient_id": patient["patient_id"],
            "patient_name": patient["patient_name"]
        }

    return {
        "message": "Invalid Patient ID or Password"
    }


@router.post("/doctor")
def doctor_login(login: DoctorLogin):

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT
            doctor_id,
            doctor_name
        FROM doctor
        WHERE doctor_id=%s
        AND password=%s
    """, (login.doctor_id, login.password))

    doctor = cursor.fetchone()

    cursor.close()
    conn.close()

    if doctor:
        return {
            "message": "Doctor Login Successful",
            "doctor_id": doctor["doctor_id"],
            "doctor_name": doctor["doctor_name"]
        }

    return {
        "message": "Invalid Doctor ID or Password"
    }


@router.post("/receptionist")
def receptionist_login(login: ReceptionistLogin):

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT
            receptionist_id,
            receptionist_name
        FROM receptionist
        WHERE receptionist_id=%s
        AND password=%s
    """, (login.receptionist_id, login.password))

    receptionist = cursor.fetchone()

    cursor.close()
    conn.close()

    if receptionist:
        return {
            "message": "Receptionist Login Successful",
            "receptionist_id": receptionist["receptionist_id"],
            "receptionist_name": receptionist["receptionist_name"]
        }

    return {
        "message": "Invalid Receptionist ID or Password"
    }


@router.post("/admin")
def admin_login(login: AdminLogin):

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT
            administrator_id,
            administrator_name
        FROM administrator
        WHERE administrator_id=%s
        AND password=%s
    """, (login.administrator_id, login.password))

    admin = cursor.fetchone()

    cursor.close()
    conn.close()

    if admin:
        return {
            "message": "Administrator Login Successful",
            "administrator_id": admin["administrator_id"],
            "administrator_name": admin["administrator_name"]
        }

    return {
        "message": "Invalid Administrator ID or Password"
    }
        