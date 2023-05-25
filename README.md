# REST-REACT-FPMS (Publication Management System)  

## Installation 
It is better to clear the pycache files(if any present) before running the following commands.  
 ```
TERMINAL

REST-REACT-FPMS> npm install
              pip install -r requirements.txt
              npm run dev
              python manage.py makemigrations accounts
              python manage.py makemigrations papers
              python manage.py migrate
REST-REACT-FPMS/proj_fpms>python manage.py runserver
```
If on linux use command 'npm rebuild' before 'npm run dev'  
  
For register authentication mail:  
  add your email and password to your device environment variables as:  
```
EMAIL_USER: your email  
EMAIL_PASSWORD: your password  
```

## Use  

**Sign up** and **verify your account** in order to **login** into the system.  
The management of one's academic papers is provided in the **profile section**. You can add papers through a simple form displayed in the profile page and view the papers that have been added in the bottom of the page in a table. We facilitate multiple imports through a bibtex file (.bib file) or simply add single papers through bibtex format.

The user can now **export** the available papers in various formts(MLA, APA, UGC/TU, IEEE). To export the papers go to 'Export Papers' in profile. Select appropriate format from the available list. Also filter papers with the help of other parameters available on the same page. Once you have the desired paper list, you can export it as **pdf** or **spread sheet**.


