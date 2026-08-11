# NEXUS – Smart Patient Journey

NEXUS is a smart hospital patient journey and queue management system designed to organize patient registration, appointments, queues, and coordination between patients and hospital staff.

## Project Overview

NEXUS provides a digital platform for managing the hospital patient journey through different user roles.

The system provides separate functionality for Patients, Doctors, Receptionists, and Administrators. It includes patient registration, appointment management, department management, queue management, dashboards, consultations, prescriptions, medical history, billing, and AI-based queue optimization.

The project uses React and Vite for the frontend, Python and FastAPI for the backend, and MySQL for the database.

## Key Features

- Patient registration and login
- Doctor registration and management
- Receptionist management
- Administrator management
- Department management
- Appointment management
- Digital queue management
- Queue tracking
- Emergency queue handling
- Special-care queue handling
- Patient dashboard
- Doctor dashboard
- Receptionist dashboard
- Administrator dashboard
- Consultation management
- Prescription management
- Medical history management
- Billing management
- AI-based queue optimization
- Patient journey management

## User Roles

### Patient

- Register and log in
- Access patient dashboard
- View appointments
- Track queue status
- View prescriptions
- View medical history
- View billing information

### Doctor

- Log in using Doctor ID and password
- Access doctor dashboard
- View appointments
- View assigned patients
- Manage consultations
- Manage prescriptions
- View patient information

### Receptionist

- Log in using Receptionist ID and password
- Access receptionist dashboard
- Register patients
- Manage appointments
- Assign departments and doctors
- Manage patient queues
- Track queue status
- Manage patient information

### Administrator

- Log in using Administrator ID and password
- Access administrator dashboard
- Manage doctors
- Manage receptionists
- Manage departments
- View administrative information

## Technologies Used

### Frontend

- React
- Vite
- JavaScript
- HTML
- CSS
- Tailwind CSS

### Backend

- Python
- FastAPI
- Pydantic
- Uvicorn

### Database

- MySQL
- MySQL Workbench
- MySQL Connector

### AI and Data Processing

- Python
- NumPy
- Pandas
- Scikit-learn

### Development Tools

- Visual Studio Code
- Git
- GitHub
- MySQL Workbench

## Project Structure

```text
NEXUS/
│
├── ai/
│   ├── optimizer.py
│   ├── predict.py
│   ├── preprocess.py
│   └── train.py
│
├── backend/
│   ├── api/
│   ├── schemas/
│   ├── services/
│   ├── utils/
│   ├── config.py
│   ├── db.py
│   ├── main.py
│   └── requirements.txt
│
├── database/
│   ├── schema.sql
│   ├── sample.sql
│   └── queries.sql
│
├── frontend/
│   └── frontend-temp/
│       ├── public/
│       ├── src/
│       ├── package.json
│       └── vite.config.js
│
├── tests/
│   └── test_connection.py
│
├── .gitignore
└── README.md