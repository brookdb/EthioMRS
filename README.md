# EthioMRS
This is a medical recording system designed for medical facilities in Ethiopia.It has code for both the back-end (node.js, express.js, Apollo, and GraphQL) and front-end (React). This is the first part of the whole project (CORE Modules) and in time more modules will be added.
Before starting the first install node.js and mongodb on your system. Also install npm and create-react-app if you already don't have it installed.
After installing those things, set up the mongo db environemt by running the 'mongod.exe' file (if you don't to have the data base locally, you can always use other sources like MLabs and change the database configuration in the 'server/app.js' file). Then open a terminal and download this repo from github.
Get in the server directory and type 'npm start app'. Then open a different terminal and navigate to the client directory (front-end side). Type in 'npm install' to install all dependecies then when its done, type in 'yarn start'.
On your browser, type in 'localhost:3001' (you can change the port number if you want)
