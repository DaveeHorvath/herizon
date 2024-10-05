FROM python:3.6

ENV PYTHONUNBUFFERED 1

RUN mkdir /code
WORKDIR /code


RUN apt-get update && apt-get upgrade -y && apt-get install -y \
python3-pip

RUN pip3 install virtualenv
RUN python3 -m venv venv
RUN /bin/bash -c "source venv/bin/activate"
RUN pip3 install django

ADD . /code/