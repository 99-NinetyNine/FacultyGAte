# Use an official Python runtime as the base image
FROM python:3.6-alpine

# Set the working directory in the container
WORKDIR /home/FacultyGAte/

# Copy the requirements file to the working directory
COPY requirements.txt .

# Install the project dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the project code to the working directory
COPY . .

# Set the environment variable for Django
ENV DJANGO_SETTINGS_MODULE=fpms.settings

# Expose the port for Gunicorn
EXPOSE 8000

# Run the Gunicorn server
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "fpms.wsgi:application"]
