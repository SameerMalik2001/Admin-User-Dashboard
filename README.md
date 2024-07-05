# Setup the Project to Run

## 1. Create a new project

create react app by [Create React App](https://github.com/facebook/create-react-app) command.

### a. Directory of frontned will like this
![alt text](frontend-1.png) 

### b. Directory of backned will like this
![alt text](backend-1.png)

## 2. Installation

Installation of neccessary packages for frontned and backned.

### install these in frontend directory

@reduxjs/toolkit : ^2.2.3 <br>
axios : ^1.6.8 <br>
dotenv : ^16.4.5 <br>
react : ^18.2.0 <br>
react-dom : ^18.2.0 <br>
react-redux : ^9.1.0 <br>
react-router : ^6.22.3 <br>
react-router-dom : ^6.22.3 <br>
react-scripts : ^5.0.1 <br>

### install these in backend directory

bcrypt : ^5.1.1 <br>
cloudinary : ^2.1.0 <br>
cookie-parser : ^1.4.6 <br>
cors : ^2.8.5 <br>
dotenv : ^16.4.5 <br>
express : ^4.19.2 <br>
jsonwebtoken : ^9.0.2 <br>
mongodb : ^6.5.0 <br>
mongoose : ^8.2.4 <br>
multer : ^1.4.5-lts.1 <br>
nodemon : ^3.1.0

## 3. Create a new database project on MongoDB 

Create a new database project on MongoDB Atlas and connect to the backend by providing MongoDB URI in .env file.

## 4. fill all the fields in the .env file

Fill the MongoDB URI, access token secret, refresh token etc.

## 5. Run the command

Run the server by `npm start` in `Root_folder/backend`<br>
start the React script by `npm start` in `Root_folder/frontend`<br>

`Note:` Do this in there respective directory.

# The End