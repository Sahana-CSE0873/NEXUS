from fastapi import APIRouter
from db import get_connection
from schemas.queue import QueueRegister

router = APIRouter(
    prefix="/queue",
    tags=["Queue"]
)


@router.post("/generate")
def register_queue(queue: QueueRegister):

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    # Check whether queue already exists
    cursor.execute("""
        SELECT queue_id
        FROM queue
        WHERE appointment_id=%s
    """, (queue.appointment_id,))

    existing_queue = cursor.fetchone()

    if existing_queue:
        cursor.close()
        conn.close()

        return {
            "message": "Queue already generated for this appointment"
        }

    # Count queues
    cursor.execute("""
        SELECT COUNT(*) AS total
        FROM queue
    """)

    total = cursor.fetchone()["total"]

    queue_id = f"QUE{total + 1:06d}"
    queue_number = f"Q{total + 1:03d}"

    sql = """
    INSERT INTO queue
    (
        queue_id,
        appointment_id,
        department_id,
        service_priority,
        queue_number,
        queue_sequence,
        current_position,
        queue_status,
        estimated_wait_time
    )
    VALUES
    (%s,%s,%s,%s,%s,%s,%s,%s,%s)
    """

    values = (
        queue_id,
        queue.appointment_id,
        queue.department_id,
        queue.service_priority,
        queue_number,
        total + 1,
        total + 1,
        "Waiting",
        0
    )

    print(values)

    cursor.execute(sql, values)
    conn.commit()

    cursor.close()
    conn.close()

    return {
        "message": "Queue Created Successfully",
        "queue_id": queue_id,
        "queue_number": queue_number
    }


@router.put("/next")
def next_patient():

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT *
        FROM queue
        WHERE queue_status='Waiting'
        ORDER BY queue_sequence
        LIMIT 1
    """)

    patient = cursor.fetchone()

    if patient is None:
        cursor.close()
        conn.close()

        return {
            "message": "No Patients Waiting"
        }

    cursor.execute("""
        UPDATE queue
        SET queue_status='Called'
        WHERE queue_id=%s
    """, (patient["queue_id"],))

    cursor.execute("""
        UPDATE appointment
        SET status='Confirmed'
        WHERE appointment_id=%s
    """, (patient["appointment_id"],))

    conn.commit()

    cursor.close()
    conn.close()

    return {
        "message": "Next Patient Called",
        "queue_number": patient["queue_number"],
        "appointment_id": patient["appointment_id"]
    }


@router.put("/complete/{queue_id}")
def complete_patient(queue_id: str):

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT appointment_id
        FROM queue
        WHERE queue_id=%s
    """, (queue_id,))

    appointment = cursor.fetchone()

    if appointment is None:
        cursor.close()
        conn.close()

        return {
            "message": "Queue Not Found"
        }

    cursor.execute("""
        UPDATE queue
        SET queue_status='Completed'
        WHERE queue_id=%s
    """, (queue_id,))

    cursor.execute("""
        UPDATE appointment
        SET status='Completed'
        WHERE appointment_id=%s
    """, (appointment["appointment_id"],))

    conn.commit()

    cursor.close()
    conn.close()

    return {
        "message": "Patient Consultation Completed"
    }


@router.get("/display")
def queue_display():

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT
            queue_number,
            queue_status,
            current_position,
            estimated_wait_time,
            department_id
        FROM queue
        WHERE queue_status IN ('Waiting','Called')
        ORDER BY queue_sequence
    """)

    data = cursor.fetchall()

    cursor.close()
    conn.close()

    return data


@router.get("/")
def get_queue():

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT
            q.queue_id,
            q.queue_number,
            p.patient_id,
            p.patient_name,
            d.department_name AS department,
            q.queue_status,
            q.service_priority,
            q.estimated_wait_time
        FROM queue q
        JOIN appointment a
            ON q.appointment_id = a.appointment_id
        JOIN patient p
            ON a.patient_id = p.patient_id
        JOIN department d
            ON q.department_id = d.department_id
        ORDER BY q.queue_sequence ASC
    """)

    queue = cursor.fetchall()

    cursor.close()
    conn.close()

    return queue