# Task Manager API

This is a RESTful API for a simple task manager application built with Node.js and Express.js. The API allows users to perform CRUD operations (Create, Read, Update, and Delete) on tasks. Each task has a title, description, completion status, and priority level.

## Installation

1. Clone the repository:

git clone <repository-url>

2. Install dependencies:

npm install

3. Start the server:

npm start

Access the API endpoints using a tool like Postman or cURL.

API Endpoints

    GET /tasks: Retrieve all tasks.
    GET /tasks/:id: Retrieve a single task by its ID.
    POST /tasks: Create a new task.
    PUT /tasks/:id: Update an existing task by its ID.
    DELETE /tasks/:id: Delete a task by its ID.

Data Format

The API expects and returns data in JSON format. Here's an example task object:

{
  "id": "1",
  "title": "Complete project proposal",
  "description": "Write and submit the project proposal by the deadline",
  "completed": false,
  "priority": "high"
}
