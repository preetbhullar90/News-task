# Your Project Name

## Setting Up the Project Locally

1. **Clone the Repository:**
   
   git clone https://github.com/your-username/your-project.git
   cd your-project

2. **Create Environment Variables:**
Create two files in the project root: .env.test and .env.development.
Add the following line to each file, replacing 'your-dev-database' and 'your-test-database' with the actual database names:

PGDATABASE='your-dev-database'
PGDATABASE='your-test-database'


Ensure that these .env files are included in your .gitignore to keep sensitive information secure.

Now run command 'npm install'