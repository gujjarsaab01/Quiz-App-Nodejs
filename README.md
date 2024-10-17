#Quiz App
This is a simple Quiz Application built using Node.js and MongoDB. The app allows users to create, manage, and participate in quizzes. Quizzes are time-bound, with a status that updates automatically based on their start and end times. The application also caches frequently accessed data to improve response times.

#########################################################################################################################

#Features
Create a new quiz with a start time and automatic end time (5 minutes after the start).
Status of quizzes is updated automatically to inactive, active, or finished based on time.
Active quizzes can be retrieved by users, and results are displayed once the quiz ends.
Cron job runs every minute to update quiz statuses and log the remaining time for active quizzes.

##########################################################################################################################

Method	             Endpoint	                    Description
POST	              /quizzes	                    Create a new quiz.
GET	                /quizzes/active	              Retrieve the active quiz (if within the start and end time).
GET	                /quizzes/:id/result	          Get the result of a quiz by its ID (available after the quiz ends).
GET	                /quizzes/all	                Retrieve all quizzes, with their statuses.

#Installation
Prerequisites
Node.js (v14 or later)
MongoDB (local or MongoDB Atlas)
Postman (for testing API)
