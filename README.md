# Should I Bunk? - Full-Stack Attendance Tracker

A comprehensive web application built from scratch to help college students manage their attendance efficiently. This tool provides real-time tracking, predictive analysis, and a secure, user-friendly interface to help students stay on top of their academic requirements.

**Live Demo:** [https://shouldibunkbykishan.netlify.app/](https://shouldibunkbykishan.netlify.app/)
**Video Demo:** [Watch the Project Demo on Google Drive](https://drive.google.com/file/d/1-jLUiEgQEOQjPKXq6MbBs0cGQgExrRp7/view?usp=sharing)

---

## 🚀 Key Features

- **Secure Authentication:** Users can sign up and log in securely, with support for password resets via email.
- **Dynamic Dashboard:** A central dashboard to create, delete, and view all courses with their real-time attendance statistics.
- **Detailed Attendance Tracking:** Mark classes as **Attended**, **Missed**, or **Cancelled** and see all counts update instantly.
- **Predictive Insights:**
    - Calculates the number of **"Safe Bunks"** remaining before hitting the attendance threshold.
    - Shows a live prediction of your future attendance percentage if you were to miss the next scheduled class.
- **Modern User Interface:**
    - A clean, professional, and fully responsive design that works on desktop and mobile.
    - Includes a **Dark Mode** toggle for user comfort.
    - Visual feedback with color-coded "attendance battery" progress bars.

---

## 💻 Tech Stack

### Backend
* **Java 17** & **Spring Boot 3**
    * Spring Web
    * Spring Security (JWT Authentication)
    * Spring Data JPA
* **PostgreSQL** Database
* **Maven** for dependency management

### Frontend
* **React 18** & **Vite**
* **Material-UI (MUI)** for the component library and styling
* **Axios** for API communication
* **React Router** for page navigation

---

## ☁️ Deployment

- **Backend (Spring Boot):** The application was containerized using **Docker** and pushed to Docker Hub. It is deployed as a Web Service on **Render** using the public Docker image.
- **Database (PostgreSQL):** A managed PostgreSQL instance is hosted on **Render** and connected to the backend service via an internal URL.
- **Frontend (React):** The static site is deployed on **Netlify**, connected directly to the GitHub repository for continuous deployment.

---

## 📸 Screenshots

### Landing & Authentication Pages

| Landing Page | Login Page | Signup Page | Forgot Password |
|:------------:|:----------:|:-----------:|:----------------:|
| ![Login](frontend/assets/Signin.png) | ![Register](frontend/assets/Signup.png) | ![Forgot Password](frontend/assets/Forgot.png) |

### Main Dashboard

![Dashboard](frontend/assets/Dashboard.png)


---

## 🔧 Setup and Installation (For Developers)

To run this project on your local machine:

### Prerequisites
* Java 17+
* Maven 3.8+
* Node.js 18+
* A running PostgreSQL instance
* Docker Desktop (optional, for building images)

### 1. Clone the Repository
```bash
git clone [https://github.com/KishanRaj0007/should-i-bunk-app.git](https://github.com/KishanRaj0007/should-i-bunk-app.git)
cd should-i-bunk-app
```
### 2. Configure the Backend
1.  Navigate to the `backend` directory.
2.  Update `src/main/resources/application.properties` with your local PostgreSQL database credentials and your Gmail App Password for the email service.
3.  Run the Spring Boot application from your IDE or using Maven.

### 3. Configure the Frontend
1.  Navigate to the `frontend` directory.
2.  Install the necessary packages:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
The application will be available at `http://localhost:5173`.

---

## 📬 Contact

Kishan Raj

* **LinkedIn:** [https://www.linkedin.com/in/kishan0007/](https://www.linkedin.com/in/kishan0007/)