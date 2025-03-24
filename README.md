# Resume Analyzer Application
A web application that provides resume analysis using Google GenAI(gemini-2.0-flash)

#### Features:
1. Analyze resume and give feedback and suggestion to user using Generative AI(Done)
2. Spelling and Grammar Checking using Generative AI(Done)
3. Chatbot for Giving Career Advice and Suggestion(Done)
4. Translate PDF resume lang e.g. from eng to chinese?
5. 

<br>

![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
<br><br>

<b>Deployed Website/Server On Render.com</b><br>

Frontend Website: <br>
- [React with Styled Component](https://resume-analyzer-react.onrender.com/) <br><br>

Backend Server: <br>
- [Node.js Backend Auth](https://resume-analyzer-backend-auth-nodejs.onrender.com/)<br>
- [Python FastAPI Google GenAI Backend](https://resume-analyzer-genai-fastapi.onrender.com/docs)<br>

<br><br>

## Website Preview
<img src="https://github.com/user-attachments/assets/0c3821ab-6b60-437f-8c7d-17d8bf5271bc" height="250" width="430" alt="Original Input">
<img src="https://github.com/user-attachments/assets/dc9b219e-c1b0-4c8a-a8eb-ae5de5623292" height="250" width="430" alt="Original Input"><br>
<img src="https://github.com/user-attachments/assets/09969d1c-cd1e-44b1-a19f-60b7cecf2d95" height="250" width="430" alt="Original Input">
<img src="https://github.com/user-attachments/assets/93d3e826-d805-495e-b77d-2469a9322680" height="250" width="430" alt="Original Input"><br>

<br><br>

## Installation Guide

Options:
1. Installation via Docker (🚀 Quick Start)
2. Installation of frontend and backend individually

<br>

### Options 1
------

Pre-requisites:
1. Docker Desktop

#### Installation steps

1. Create .env file from each .env.example for each services in their respective folder (if required)
```
  ## EXAMPLE FOR PYTHON FASTAPI BACKEND SERVER

  GOOGLE_API_KEY={YOUR_GOOGLE_API_KEY}
```
2. Change the API URL used in the React Website Folder (if required)
```
  # under GrammarChecker.jsx, ResumeAnalyzer.jsx, AIChatbot.jsx, change to:
  http://localhost:8000/

  # under LoginForm.jsx, RegisterForm.jsx, change to:
  http://localhost:8080/
```
3. Under root directory, run docker compose command below to build and run container
```
  docker-compose up --build
```
4. Check respective localhost to see if each service/website is up and running
```
  # FRONTEND WEBSITE
  http://localhost:5173/
  
  # BACKEND NODEJS SERVER FOR USER AUTHENTICATION
  http://localhost:8080/
  
  # BACKEND PYTHON FASTAPI FOR GOOGLE GEMINI AI SERVICE
  http://localhost:8000/
```

### Options 2
------
Pre-requisites:
1. Node.js
2. Python/Anaconda

#### Installation steps

1. Create .env file from each .env.example for each services in their respective folder (if required)
```
  ## EXAMPLE FOR PYTHON FASTAPI BACKEND SERVER

  GOOGLE_API_KEY={YOUR_GOOGLE_API_KEY}
```
2. Change the API URL used in the React Website Folder (if required)
```
  # under GrammarChecker.jsx, ResumeAnalyzer.jsx, AIChatbot.jsx, change to:
  http://localhost:8000/

  # under LoginForm.jsx, RegisterForm.jsx, change to:
  http://localhost:8080/
```
3. For react frontend, run the following command:
```
  npm install
  npm run dev
```
4. For node.js backend auth, run the following command:
```
  npm install
  node server.js
    or
  npm start
```
5. For python fastapi backend, follow the steps below:
```
  # 1. Create Virtual Environment either using via Python or Anaconda(if Anaconda is Installed)
  # 2. Activate the virtual/conda environment
  # 3. Run the following command:
  pip install -r requirement.txt
  uvicorn main:app --reload 
```

