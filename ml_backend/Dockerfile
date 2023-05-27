FROM python:3.9-slim

WORKDIR /app

COPY ./requirements.txt .

# Install the Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# ENTRYPOINT [ "tail", "-f", "/dev/null" ]
ENTRYPOINT [ "uvicorn", "app:app", "--host", "0.0.0.0", "--port", "3002"]