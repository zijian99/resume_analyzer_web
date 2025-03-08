from fastapi import FastAPI, UploadFile, File
import pdfplumber
import docx
# import openai
import io
from google import genai
from google.genai import types
import json
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
from fastapi import HTTPException
from pydantic import BaseModel
import language_tool_python
from spellchecker import SpellChecker

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
    return {"message": "CORS enableds"}

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



# OLD PROMPT, SAVED FOR REFERENCE PURPOSE
# """
#         You are an AI resume reviewer that evaluates resumes based on clarity, relevance, and effectiveness for job applications. 
#         Analyze the following resume and provide structured feedback in **JSON format** with these fields:

#         1 **score**: A rating from 0 to 100 based on resume quality.
#         2 **feedback**: Strengths of the resume.
#         3 **suggestions**: Areas for improvement
#         """




def analyze_resume_with_ai(text):
    """Send the extracted text to OpenAI GPT for analysis"""

    # sys_instruct="You are an expert resume reviewer. Your task is to review the resume."
    sys_instruct=f"""
            You are an AI resume reviewer that evaluates resumes based on clarity, relevance, and effectiveness for job applications.  
            Analyze the following resume and provide structured feedback in **valid JSON format** with these fields:

            1. **score**: A rating from 0 to 100 based on the overall resume quality.
            2. **content_score**: A rating from 0 to 100 for resume content quality.
            3. **format_score**: A rating from 0 to 100 for formatting consistency.
            4. **sections_score**: A rating from 0 to 100 for completeness of necessary sections.
            5. **skills_score**: A rating from 0 to 100 for how well skills are presented.
            6. **ats_parse_rate**: A percentage (0-100) indicating how well the resume can be parsed by an ATS.
            7. **analysis**: A list of **exactly five** structured feedback items, each with:
            - **category**: One of the following five:
                - "Content Suggestions"
                - "Spelling & Grammar"
                - "Resume Length"
                - "Personal Details"
                - "Formatting Tips"
            - **feedback**: A short statement on what the resume does well in this category.
            - **suggestions**: Actionable advice on how to improve.

            💡 **Important Rules:**
            - Always include **all five categories**, even if no issues are found.
            - Do not analyze any extra categories.
            - Ensure the response is **valid JSON** with correct syntax.
        """
    response = client.models.generate_content(
        model="gemini-2.0-flash",
        config=types.GenerateContentConfig(
            system_instruction=sys_instruct),
        contents=[text]
    )
    print(response)

    # Extract raw response text
    raw_text = response.candidates[0].content.parts[0].text
    print(raw_text)
    # Remove markdown ```json and ``` from the response
    json_text = raw_text.strip("```json\n").strip("```")
    print(json_text)
    
     # Parse the JSON string into a dictionary
    try:
        resume_analysis = json.loads(json_text)
    except json.JSONDecodeError:
        print("Error: Failed to parse JSON")
        return None

    print(resume_analysis)
    # Print overall score
    print(f"Overall Score: {resume_analysis['score']}")
    print(f"Content Score: {resume_analysis['content_score']}")
    print(f"Format Score: {resume_analysis['format_score']}")
    print(f"Sections Score: {resume_analysis['sections_score']}")
    print(f"Skills Score: {resume_analysis['skills_score']}")
    print(f"ATS Parse Rate: {resume_analysis['ats_parse_rate']}%")
    print("\n--- Resume Analysis ---\n")

    # Print each category with feedback and suggestions
    for item in resume_analysis["analysis"]:
        print(f"Category: {item['category']}")
        print(f"  Feedback: {item['feedback']}")
        print(f"  Suggestions: {item['suggestions']}\n")

    return resume_analysis  # Return the JSON string if needed

    # # Parse the JSON string into a dictionary
    # resume_analysis = json.loads(json_text)
    # print(resume_analysis)

    # # Extract individual components
    # score = resume_analysis["score"]
    # feedback = resume_analysis["feedback"]
    # suggestions = resume_analysis["suggestions"]

    # # Print results
    # print(f"Score: {score}")
    # print(f"Feedback: {feedback}")
    # print("Suggestions:")
    # for suggestion in suggestions:
    #     print(f"- {suggestion}")

    
    # return resume_analysis


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

@app.post("/upload_resume/")
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




# Request model
class TextInput(BaseModel):
    text: str

@app.post("/check_text/")
async def check_text(input_text: TextInput):
    try:
        original_text = input_text.text

        # Define a structured prompt
        prompt = f"""
        Please proofread the following text and return a structured JSON output:
        
        1. The fully corrected text.
        2. A list of spelling mistakes with their corrections.
        3. A list of grammar mistakes, their corrections, and suggested improvements.

        Return the result in the following JSON format:

        {{
            "corrected_text": "fully corrected version",
            "spelling_errors": [
                {{"original": "misspelled_word", "corrected": "correct_word"}},
                ...
            ],
            "grammar_errors": [
                {{"original": "incorrect_sentence", "corrected": "fixed_sentence", "suggestion": "brief_explanation"}},
                ...
            ]
        }}

        """


        response = client.models.generate_content(
            model="gemini-2.0-flash",
            config=types.GenerateContentConfig(
                system_instruction=prompt),
            contents=[original_text]
        )
        print(response)
        

        raw_text = response.candidates[0].content.parts[0].text

        # Remove markdown code block (```json ... ```)
        json_text = raw_text.strip("```json").strip("```").strip()

        # Convert cleaned text into a dictionary
        structured_response = json.loads(json_text)

        print(structured_response)

        return structured_response

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))