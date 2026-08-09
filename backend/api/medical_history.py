from fastapi import APIRouter
from db import get_connection
from schemas.medical_history import MedicalHistoryRegister

router = APIRouter(
    prefix="/medical-history",
    tags=["Medical History"]
)


@router.post("/add")
def add_medical_history(history: MedicalHistoryRegister):

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT COUNT(*) AS total FROM medical_history")
    total = cursor.fetchone()["total"]

    history_id = f"HIS{total + 1:06d}"

    sql = """
    INSERT INTO medical_history
    (
        history_id,
        patient_id,
        doctor_id,
        appointment_id,
        diagnosis,
        treatment,
        allergies,
        chronic_diseases,
        notes
    )
    VALUES
    (%s,%s,%s,%s,%s,%s,%s,%s,%s)
    """

    values = (
        history_id,
        history.patient_id,
        history.doctor_id,
        history.appointment_id,
        history.diagnosis,
        history.treatment,
        history.allergies,
        history.chronic_diseases,
        history.notes
    )

    cursor.execute(sql, values)
    conn.commit()

    cursor.close()
    conn.close()

    return {
        "message": "Medical History Added Successfully",
        "history_id": history_id
    }


@router.get("/patient/{patient_id}")
def get_patient_history(patient_id: str):

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT
            history_id,
            appointment_id,
            diagnosis,
            treatment,
            allergies,
            chronic_diseases,
            notes,
            created_at
        FROM medical_history
        WHERE patient_id = %s
        ORDER BY created_at DESC
    """, (patient_id,))

    history = cursor.fetchall()

    cursor.close()
    conn.close()

    return history


@router.get("/appointment/{appointment_id}")
def get_appointment_history(appointment_id: str):

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT *
        FROM medical_history
        WHERE appointment_id = %s
    """, (appointment_id,))

    history = cursor.fetchone()

    cursor.close()
    conn.close()

    return history


# ----------------------------
# GET HISTORY BY DOCTOR
# ----------------------------
@router.get("/doctor/{doctor_id}")
def get_doctor_history(doctor_id: str):

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT
            history_id,
            patient_id,
            appointment_id,
            diagnosis,
            treatment,
            allergies,
            chronic_diseases,
            notes,
            created_at
        FROM medical_history
        WHERE doctor_id = %s
        ORDER BY created_at DESC
    """, (doctor_id,))

    history = cursor.fetchall()

    cursor.close()
    conn.close()

    return history