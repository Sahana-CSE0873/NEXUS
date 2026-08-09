from fastapi import APIRouter
from db import get_connection
from schemas.consultation import ConsultationStart, ConsultationComplete
from datetime import date, datetime

router = APIRouter(
    prefix="/consultation",
    tags=["Consultation"]
)


@router.post("/start")
def start_consultation(data: ConsultationStart):

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    # Generate Consultation ID
    cursor.execute("SELECT COUNT(*) AS total FROM consultation")
    total = cursor.fetchone()["total"]

    consultation_id = f"CON{total+1:06d}"

    sql = """
    INSERT INTO consultation
    (
        consultation_id,
        appointment_id,
        patient_id,
        doctor_id,
        consultation_status,
        consultation_date,
        consultation_start_time
    )
    VALUES
    (%s,%s,%s,%s,%s,%s,%s)
    """

    values = (
        consultation_id,
        data.appointment_id,
        data.patient_id,
        data.doctor_id,
        "Started",
        date.today(),
        datetime.now().time()
    )

    cursor.execute(sql, values)
    conn.commit()

    cursor.close()
    conn.close()

    return {
        "message": "Consultation Started Successfully",
        "consultation_id": consultation_id
    }


@router.put("/complete")
def complete_consultation(data: ConsultationComplete):

    conn = get_connection()
    cursor = conn.cursor()

    sql = """
    UPDATE consultation
    SET
        diagnosis=%s,
        prescription=%s,
        doctor_notes=%s,
        consultation_status='Completed',
        consultation_end_time=%s
    WHERE consultation_id=%s
    """

    values = (
        data.diagnosis,
        data.prescription,
        data.doctor_notes,
        datetime.now().time(),
        data.consultation_id
    )

    cursor.execute(sql, values)
    conn.commit()

    cursor.close()
    conn.close()

    return {
        "message": "Consultation Completed Successfully"
    }