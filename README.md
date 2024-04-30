# REST-REACT-FPMS (Publication Management System)  

## Abstract 
The Faculty Publication Management System (FPMS) serves as a centralized platform for managing faculty publications. Default users have access to viewing and searching papers, as well as exporting them in MLA, APA, IEEE, or BibTeX formats. They can also identify paper authors. Faculty members, on the other hand, possess additional privileges such as adding, editing, and deleting papers, as well as adding peers. Establishing centralized repositories for faculty publications facilitates easy storage, management, and retrieval of papers. Moreover, it simplifies the process of citing these papers.

## FacultyGAte Documentation

- **Use Case Diagram:** [Download](https://github.com/99-NinetyNine/FacultyGAte/blob/master/Use%20case%20and%20Data%20flow%20Diagram.pdf)
- **User Documentation:** [Download](https://github.com/99-NinetyNine/FacultyGAte/blob/master/User%20Documentation.pdf)
- **Database Schema:** [Download](https://github.com/99-NinetyNine/FacultyGAte/blob/master/dbms.pdf)

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


