# [Unit]
# Description=gunicorn daemon
# Requires=gunicorn.socket
# After=network.target

# [Service]
# User=root
# Group=root
# WorkingDirectory=/home/FacultyGAte/proj_fpms
# ExecStart=/home/FacultyGAte/proj_fpms/venv/bin/gunicorn \
#           --access-logfile - \
#           --workers 3 \
#           --bind unix:/run/gunicorn.sock \
#           fpms.wsgi:application

# [Install]
# WantedBy=multi-user.target