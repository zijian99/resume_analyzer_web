from fastapi import FastAPI, UploadFile, File
import pdfplumber
import docx
import openai
import io
from google import genai
from google.genai import types
import json
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Get the API key
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

# Print to check (remove this in production)
print("Google API Key:", GOOGLE_API_KEY)

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to specific frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "CORS enabled"}

# Set your OpenAI API key (replace 'your-api-key' with your actual key)

# from openai import OpenAI

# client = OpenAI(api_key="")  # Ensure you set your OpenAI API key

client = genai.Client(api_key=GOOGLE_API_KEY)


def extract_text_from_pdf(file):
    """Extract text from PDF using pdfplumber"""
    text = ""
    with pdfplumber.open(file) as pdf:
        for page in pdf.pages:
            text += page.extract_text() + "\n"
    return text

def extract_text_from_docx(file):
    """Extract text from DOCX using python-docx"""
    text = ""
    doc = docx.Document(file)
    for para in doc.paragraphs:
        text += para.text + "\n"
    return text







def analyze_resume_with_ai(text):
    """Send the extracted text to OpenAI GPT for analysis"""

    # sys_instruct="You are an expert resume reviewer. Your task is to review the resume."
    sys_instruct=f"""
        You are an AI resume reviewer that evaluates resumes based on clarity, relevance, and effectiveness for job applications. 
        Analyze the following resume and provide structured feedback in **JSON format** with these fields:

        1 **score**: A rating from 0 to 100 based on resume quality.
        2 **feedback**: Strengths of the resume.
        3 **suggestions**: Areas for improvement
        """
    response = client.models.generate_content(
        model="gemini-2.0-flash",
        config=types.GenerateContentConfig(
            system_instruction=sys_instruct),
        contents=[text]
    )
    # print(response)

    # Extract raw response text
    raw_text = response.candidates[0].content.parts[0].text

    # Remove markdown ```json and ``` from the response
    json_text = raw_text.strip("```json\n").strip("```")

    # Parse the JSON string into a dictionary
    resume_analysis = json.loads(json_text)

    # Extract individual components
    score = resume_analysis["score"]
    feedback = resume_analysis["feedback"]
    suggestions = resume_analysis["suggestions"]

    # Print results
    print(f"Score: {score}")
    print(f"Feedback: {feedback}")
    print("Suggestions:")
    for suggestion in suggestions:
        print(f"- {suggestion}")

    
    return {"score":score, "feedback":feedback, "suggestions":suggestions}
    # return response


# def analyze_resume_with_ai(text):
#     """Send the extracted text to OpenAI GPT for analysis"""
#     prompt = f"Analyze the following resume and provide feedback:\n\n{text}"
#     response = client.chat.completions.create(
#         model="gpt-4o-mini",
#         messages=[{"role": "system", "content": "You are an expert resume reviewer."},
#                   {"role": "user", "content": prompt}]
#     )
#     # response = openai.ChatCompletion.create(
#     #     model="gpt-4",
#     #     messages=[{"role": "system", "content": "You are an expert resume reviewer."},
#     #               {"role": "user", "content": prompt}]
#     # )
#     return response["choices"][0]["message"]["content"]

@app.post("/upload-resume/")
async def upload_resume(file: UploadFile = File(...)):
    """Handles file upload and resume analysis"""
    file_extension = file.filename.split(".")[-1].lower()
    
    # Read file content into memory
    file_content = await file.read()
    file_stream = io.BytesIO(file_content)
    
    if file_extension == "pdf":
        extracted_text = extract_text_from_pdf(file_stream)
    elif file_extension == "docx":
        extracted_text = extract_text_from_docx(file_stream)
    else:
        return {"error": "Unsupported file format. Please upload a PDF or DOCX file."}

    # Analyze resume using AI
    analysis_result = analyze_resume_with_ai(extracted_text)

    return {"filename": file.filename, "analysis": analysis_result}