from fastapi import APIRouter
from db import get_connection
from schemas.department import DepartmentRegister

router = APIRouter(
    prefix="/departments",
    tags=["Departments"]
)


@router.post("/register")
def register_department(department: DepartmentRegister):

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute(
        "SELECT * FROM department WHERE department_name=%s",
        (department.department_name,)
    )

    existing = cursor.fetchone()

    if existing:
        cursor.close()
        conn.close()

        return {
            "message": "Department already exists"
        }

    cursor.execute("SELECT COUNT(*) AS total FROM department")
    total = cursor.fetchone()["total"]

    department_id = f"DEPT{total+1:03d}"

    sql = """
    INSERT INTO department
    (
    department_id,
    department_name
    )
    VALUES (%s,%s)
    """

    values = (
        department_id,
        department.department_name
    )

    cursor.execute(sql, values)
    conn.commit()

    cursor.close()
    conn.close()

    return {
        "message": "Department Registered Successfully",
        "department_id": department_id
    }


@router.get("/all")
def get_departments():

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
    SELECT
        department_id,
        department_name
    FROM department
    ORDER BY department_name
    """)

    departments = cursor.fetchall()

    cursor.close()
    conn.close()

    return departments
@router.get("/all")
def get_all_departments():

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT
            department_id,
            department_name
        FROM department
        ORDER BY department_name
    """)

    departments = cursor.fetchall()

    cursor.close()
    conn.close()

    return departments