from fastapi import APIRouter
from db import get_connection
from schemas.doctor import DoctorRegister

router = APIRouter(
    prefix="/doctors",
    tags=["Doctors"]
)


@router.post("/register")
def register_doctor(doctor: DoctorRegister):

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    # Check duplicate mobile number
    cursor.execute(
        "SELECT * FROM doctor WHERE mobile_number=%s",
        (doctor.mobile_number,)
    )

    existing = cursor.fetchone()

    if existing:
        cursor.close()
        conn.close()

        return {
            "message": "Mobile number already registered"
        }

    cursor.execute("SELECT COUNT(*) AS total FROM doctor")
    total = cursor.fetchone()["total"]

    doctor_id = f"NXD{total+1:06d}"

    sql = """
INSERT INTO doctor
(
doctor_id,
doctor_name,
mobile_number,
password,
gender,
specialization,
department_id,
experience_years
)
VALUES (%s,%s,%s,%s,%s,%s,%s,%s)
"""

    values = (
    doctor_id,
    doctor.doctor_name,
    doctor.mobile_number,
    doctor.password,
    doctor.gender,
    doctor.specialization,
    doctor.department_id,
    doctor.experience_years
)

    cursor.execute(sql, values)

    conn.commit()

    cursor.close()
    conn.close()

    return {
        "message": "Doctor Registered Successfully",
        "doctor_id": doctor_id
    }
from fastapi import HTTPException

@router.get("/dashboard/{doctor_id}")
def doctor_dashboard(doctor_id: str):

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT
            doctor_id,
            doctor_name,
            specialization,
            experience_years,
            mobile_number
        FROM doctor
        WHERE doctor_id=%s
    """, (doctor_id,))

    doctor = cursor.fetchone()

    cursor.close()
    conn.close()

    if not doctor:
        raise HTTPException(
            status_code=404,
            detail="Doctor not found"
        )

    return doctor
from fastapi import HTTPException


@router.get("/dashboard/{doctor_id}")
def doctor_dashboard(doctor_id: str):

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT
            doctor_id,
            doctor_name,
            specialization,
            experience_years,
            mobile_number
        FROM doctor
        WHERE doctor_id=%s
    """, (doctor_id,))

    doctor = cursor.fetchone()

    cursor.close()
    conn.close()

    if not doctor:
        raise HTTPException(
            status_code=404,
            detail="Doctor not found"
        )

    return doctor
@router.get("/queue/{doctor_id}")
def doctor_queue(doctor_id: str):

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT
            patient_id,
            patient_name,
            queue_number,
            status
        FROM patient
        ORDER BY queue_number ASC
    """)

    patients = cursor.fetchall()

    cursor.close()
    conn.close()

    return patients
@router.get("/all")
def get_all_doctors():

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT
            doctor_id,
            doctor_name,
            specialization,
            mobile_number
        FROM doctor
        ORDER BY doctor_name
    """)

    doctors = cursor.fetchall()

    cursor.close()
    conn.close()

    return doctors