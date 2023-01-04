# Pro-man

## Summary

Welcome to Pro-man : the Work OS that provides you with all of the no-code building blocks so you can shape your workflows, your way. Here, you can run every aspect of your work by layering industry-specific products on top of the Work OS. Combine building blocks, like apps and integrations, to customize anything you need to improve the way your project runs.

## Set Up

### Frontend

To start the frontend application in development mode, simply run:

```bash
yarn start
```

### Server

To set up the environment in development mode, you will need to migrate the database structure, and also seed the sample data for testing. Follow the commands below to set up.

To migrate database:
```bash
yarn knex migrate:latest
```

To seed data:
```bash
yarn knex seed:run
```

You will need to start the server after that, simply run the following:
```bash
yarn start
```

## Environment Variables
Set up the .env file in both frontend and server folders.
### Frontend
- REACT_APP_API_SERVER: This is the URL to the backend server, in development mode, the default URL should be http://localhost:8080.
```bash
REACT_APP_API_SERVER = http://localhost:8080
```

### Server
- POSTGRES_DB: The database name you created for the project
- POSTGRES_USER: The user in the database
- POSTGRES_PASSWORD: The password into the database
- REACT_APP_API_SERVER: The URL of the frontend client, in development mode, the default URL is determined by React's yarn start, which is http://localhost:3000.
EMAIL_LOGIN: The email address you plan to send email to users on invitation, try to avoid gmail accounts as this will bring you lots of troubles. Find out the link for more details. <https://nodemailer.com/usage/using-gmail/>
- EMAIL_PASSWORD: The password to that email account

```bash
POSTGRES_DB = # Database Name
POSTGRES_USER = # Database User Name
POSTGRES_PASSWORD = # Database Password

REACT_APP_API_SERVER= http://localhost:3000

EMAIL_LOGIN= # Email Address
EMAIL_PASSWORD= # Email Account Password
```