FROM python:3.9-slim

# Set the working directory
WORKDIR /app

# Copy requirements (if any) and application code
COPY requirement.txt requirement.txt .
RUN pip3 install -r requirement.txt

COPY . . 

# Expose the application port
EXPOSE 8000

# Start FastAPI using Uvicorn
CMD ["uvicorn", "main:app", "--host", "127.0.0.0", "--port", "8000"] 




