FROM python:3.8-slim
ENV APP_HOME .
WORKDIR $APP_HOME
COPY . ./
RUN apk add --no-cache --virtual .build-deps g++ python3-dev libffi-dev openssl-dev && \
    apk add --no-cache --update python3 && \
    pip3 install --upgrade pip setuptools
RUN pip install -r requirements.txt
RUN pip install -U opencv-python
CMD exec gunicorn --bind :$PORT --workers 1 --worker-class uvicorn.workers.UvicornWorker  --threads 8 main:app