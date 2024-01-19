# News-task


**Live Project:** [News-website](https://news-website-0p9e.onrender.com/api/)

## Summary

The project is a backend service designed to provide programmable access to application data. It allows users to read all the articles, comments, etc. The application is built using a PostgreSQL database.

## Getting Started

To run this project locally, follow the instructions below.
### Basic

Make sure you have the following installed:

- Node.js: v21.0.0
- PostgreSQL:14.9


## Setting Up the Project Locally


1. **Clone the Repository:**
   
   git clone https://github.com/preetbhullar90/News-task

   cd News-task

### Install Dependencies

-      run command 'npm install'

2. **Create Environment Variables:**
Create two files in the project root: .env.test and .env.development.

Add the following line to each file:
-        PGDATABASE=nc_news
-        PGDATABASE=nc_news_test


### Seed Local Database

You need to seed the local database with initial data. Run the following command:

-        npm run seed


### Run Tests

Run the teste,using following command:

-         npm test