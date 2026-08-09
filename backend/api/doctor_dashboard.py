from fastapi import APIRouter
from db import get_connection

router = APIRouter(
    prefix="/doctor-dashboard",
    tags=["Doctor Dashboard"]
)


@router.get("/today-patients/{doctor_id}")
def today_patients(doctor_id: str):

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT
            a.appointment_id,
            p.patient_id,
            p.patient_name,
            a.reason_for_visit,
            a.appointment_date,
            a.appointment_time,
            q.queue_number,
            q.queue_status
        FROM appointment a
        JOIN patient p
            ON a.patient_id = p.patient_id
        LEFT JOIN queue q
            ON a.appointment_id = q.appointment_id
        WHERE a.doctor_id = %s
        ORDER BY a.appointment_time
    """, (doctor_id,))

    patients = cursor.fetchall()

    cursor.close()
    conn.close()

    return patients
@router.get("/waiting-patients/{doctor_id}")
def waiting_patients(doctor_id: str):

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT
            a.appointment_id,
            p.patient_id,
            p.patient_name,
            a.reason_for_visit,
            q.queue_number,
            q.current_position,
            q.queue_status
        FROM appointment a
        JOIN patient p
            ON a.patient_id = p.patient_id
        JOIN queue q
            ON a.appointment_id = q.appointment_id
        WHERE
            a.doctor_id = %s
            AND q.queue_status = 'Waiting'
        ORDER BY q.queue_sequence
    """, (doctor_id,))

    patients = cursor.fetchall()

    cursor.close()
    conn.close()

    return patients
@router.put("/start-consultation/{queue_id}")
def start_consultation(queue_id: str):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        UPDATE queue
        SET queue_status='In Consultation'
        WHERE queue_id=%s
    """, (queue_id,))

    conn.commit()

    cursor.close()
    conn.close()

    return {
        "message": "Consultation Started Successfully"
    }
@router.get("/history/{doctor_id}")
def consultation_history(doctor_id: str):

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT
            a.appointment_id,
            p.patient_id,
            p.patient_name,
            a.reason_for_visit,
            a.appointment_date,
            q.queue_number,
            q.queue_status
        FROM appointment a
        JOIN patient p
            ON a.patient_id = p.patient_id
        JOIN queue q
            ON a.appointment_id = q.appointment_id
        WHERE
            a.doctor_id = %s
            AND q.queue_status = 'Completed'
        ORDER BY a.appointment_date DESC
    """, (doctor_id,))

    history = cursor.fetchall()

    cursor.close()
    conn.close()

    return history