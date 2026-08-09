from fastapi import APIRouter
from db import get_connection
from schemas.billing import BillingRegister

router = APIRouter(
    prefix="/billing",
    tags=["Billing"]
)


@router.post("/generate")
def generate_bill(bill: BillingRegister):

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT COUNT(*) AS total FROM billing")
    total = cursor.fetchone()["total"]

    bill_id = f"BIL{total+1:06d}"

    total_amount = (
        bill.consultation_fee
        + bill.medicine_fee
        + bill.service_fee
    )

    sql = """
    INSERT INTO billing
    (
        bill_id,
        appointment_id,
        patient_id,
        doctor_id,
        consultation_fee,
        medicine_fee,
        service_fee,
        total_amount,
        payment_status
    )
    VALUES
    (%s,%s,%s,%s,%s,%s,%s,%s,%s)
    """

    values = (
        bill_id,
        bill.appointment_id,
        bill.patient_id,
        bill.doctor_id,
        bill.consultation_fee,
        bill.medicine_fee,
        bill.service_fee,
        total_amount,
        "Pending"
    )

    cursor.execute(sql, values)
    conn.commit()

    cursor.close()
    conn.close()

    return {
        "message": "Bill Generated Successfully",
        "bill_id": bill_id,
        "total_amount": total_amount
    }


@router.put("/pay/{bill_id}")
def pay_bill(bill_id: str):

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        UPDATE billing
        SET payment_status='Paid'
        WHERE bill_id=%s
    """, (bill_id,))

    conn.commit()

    cursor.close()
    conn.close()

    return {
        "message": "Payment Successful"
    }


@router.get("/patient/{patient_id}")
def patient_bill(patient_id: str):

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT *
        FROM billing
        WHERE patient_id=%s
        ORDER BY created_at DESC
    """, (patient_id,))

    bills = cursor.fetchall()

    cursor.close()
    conn.close()

    return bills