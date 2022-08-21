# NEU Course Wiki Frontend


## Heroku Deploy  
https://coursewiki-frontend-darkhorse.herokuapp.com/

## Test Methods:  
Search Course ID in the search box on homepage or on top navigation bar.
Try: CS5610 or CS5200

## Introduction

This is the NEU course Wiki Frontend.  

 finished all functionalities and interactions as required:  
- User interface with data by at least 2 CRUD for two database:  review database and project database.
- Three different UI routes: homepage, course page, project page.
- One Bootstrap UI component not featured in demo: InputGroup, for styling the search box on top navigation bar.
- We have different layout and design from the demo.
- We used GraphQL interface to the database. (It can be tested by running the backend)
- Additionally, we made the website look neat and nice under the mobile resolution.

## Functionality  
1. Search by course ID  
    -Links to the corresponding course page if course exists.  
    -Pop up a window to alert user that course not found.
2. Display course introduction, syllabus, reviews and projects  
    -Introduction is the same as the course introduction in official NEU course schedule. 
3. Request to upload syllabus for each course
4. Reviews:  
    -All users can see reviews while only logged in users can add reviews.   
    -When a not logged in user try to add a review, a notification pop up will remind them to login.   
    -All users can upvote and downvote a review.  
    -Users can filter reviews by semester and instructors: Semesters are written in the files.    
    -Use pagination component to see all reviews for a course.  
5. Projects:  
    -All users can see all projects.   
    -Users can filter projects by semester and instructors: Semesters are written in the files.    
    -All users can click the link to view the project.  
    -Load more button and back to the top button can help you view the projects.  

- Home Page:   
![home page](public/screenshots/homepage3.png)   

- Course Page: 
![course page](public/screenshots/coursepage4.png)  
![course page](public/screenshots/coursepage5.png) 

- Project Page:  
![project page](public/screenshots/projectpage3.png)  










