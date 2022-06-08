FROM python:3.8-slim
ENV APP_HOME .
WORKDIR $APP_HOME
COPY . ./
RUN apt-get update
RUN apt-get install ffmpeg libsm6 libxext6  -y
RUN pip install -r requirements.txt
RUN pip install -U opencv-python
CMD exec gunicorn --bind :$PORT --workers 1 --worker-class uvicorn.workers.UvicornWorker  --threads 8 main:app