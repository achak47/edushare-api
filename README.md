# edushare-api
This is the backend (server) of the project Webapp .
It is made with node/express js .
Also knex js module is used to connect it to postgresql .
bcrypt module is used to hash the password or other important user details .
You can check the full project at : https://edushare-frontend.herokuapp.com/
You can also check the deployed backend server at : https://edushare-api.herokuapp.com/

The main file here is the server.js , it is the file which listens to the port . Other files are included for various different functions and responses to be performed in the return of various requests . 
All the server pages are :
i> /signin : Contains the functions of checking user information entered in the signin page and signing in the user . 
ii> /register : For registering an user , sending all the user details to the dtabase .
iii> /adview : For fetching details of all the ads from the database and sending them to the frontend .
iv> /deletead : For deleting a particular add as requested from the frontend and removing it from the database .
v> /queries : For posting the user question and storing it in database .
vi> /queryview : For fetching all the questions from the database .
vii> /deletequery : For deleting a particular question as requested from the frontend and removing it from the database .
viii> /update : For uploading the file , ie storing the link generated by firebase to the database .
ix> /retrieve : To get the information of all the files under a particulr folder(Department and year).
x> /myres : To get information about all such files uploaded by a given user(user email)
xi> /deleteres : To delete a particular file
xii> /report : For reporting against a particular user .
xiii> /checkreport : To fetch the reports for a particular user .
xiv> /delreport : To delete a particular report . NOTE : This is not directly called , this is called when a reported file is deleted .
xv> /checkin : To check in to a report , ie to record the user response to a report .
xvi> /answer : To post an answer to a particular question .
xvii> /retanswer : To fetch all the answers to a particular question
xviii> /delanswer : To delete a particaular answer 
xix> /myanswer : To fetch all the answers posted by me 
xx> /getquestion : To fetch the question to a particular answer .
xxi> /replyad : To post a reply to a particular ad .
xxii> /myreplies : To fetch all the replies posted to an user's ad or user's reply .
xxiii> /delreply : To delete a particular reply
xxiv> /postreply : To reply to a particular reply .
xxv> /updatereply : To update our posted reply .
