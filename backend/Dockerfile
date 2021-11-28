FROM python:3.10-bullseye
COPY . /app
WORKDIR /app

ENV VIRTUAL_ENV=/usr/venv
RUN python3 -m venv ${VIRTUAL_ENV}
ENV PATH="${VIRTUAL_ENV}/bin:$PATH"

# Install dependencies
RUN pip install wheel
RUN pip install gunicorn
RUN pip install -r requirements.txt

EXPOSE 5000

# CMD ["gunicorn", "--bind", "127.0.0.1:5000", "wsgi:app"]
CMD ["python", "-m", "flask", "run"]