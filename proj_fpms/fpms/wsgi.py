"""
WSGI config for fpms project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.2/howto/deployment/wsgi/
"""

import os
import sys
from django.core.wsgi import get_wsgi_application

sys.path.append('/home/FacultyGAte/proj_fpms/fpms')
sys.path.append('/home/FacultyGAte/venv/Lib/site-packages')
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "fpms.settings")

from django.core.wsgi import get_wsgi_application

application = get_wsgi_application()
