#!/bin/bash
set -e

echo "Deployment started ..."

# Pull the latest version of the app
echo "github pull"
git pull origin master

echo "running test"
source ve/bin/activate
python manage.py test

echo "database updateing"
python manage.py migrate

echo "daemon running"
sudo systemctl daemon-reload

echo "gunicorn running"
sudo systemctl restart gunicorn

echo "New changes copied to server !"

echo "Deployment Finished!"
echo "I love you;"