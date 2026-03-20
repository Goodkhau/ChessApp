FROM python:3.13.7-slim

RUN mkdir /Server

WORKDIR /Server
COPY . /Server/
RUN pip install --no-cache-dir -r requirements.txt
EXPOSE 8000
CMD ["fastapi", "run"]