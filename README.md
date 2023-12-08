# hello-auth


This app will have 2 routes 

POST / register - This route will:
    1. Accept user info and password.
    2. Store the info along with the password hash in the database. 
    3. We will NOT store the password. 

POST / login - This route will: 
    1. Accept a user's email and apssword.
    2. Check the password against hte hash in the database that was stored on registration.
    3. If the password is good, it will return the token. 
    4. If the password is bad, it will respond with an error. 

GET / hello - This route will: 
    1. Require that a user be signed in 
    2. Return a "hello" message 
    3. "Hello" message will include user's name 