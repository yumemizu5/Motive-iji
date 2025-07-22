FROM python:3.12-slim
WORKDIR /app
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY backend /app
CMD ["gunicorn", "config.wsgi:application", "-b", "0.0.0.0:8000"]
