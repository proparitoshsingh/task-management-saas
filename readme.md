# Task Management Web Application SaaS

This is a robust task management web application SaaS built using NodeJs, TypeScript and the Effect-TS library. The application allows users to create, update, delete, and list tasks, with each task having a title, description, due date, and status.

## Features

- **User Management:** Create new users for the application.
- **Task Management:** Create, read, update, and delete tasks for each user.
- **Functional Programming:** Adheres to functional programming principles, including immutability, pure functions, and avoiding side effects by using Effect-TS library.
- **Error Handling:** Robust error handling and logging using Effect-TS's error handling capabilities.


## Technologies Used

- **TypeScript:** The application is written in TypeScript for static type checking and better tooling support.
- **Effect-TS:** Utilizes the Effect-TS library for managing effects and application state in a functional manner.
- **In-Memory Database:** Task data is stored in an in-memory database (using a Map) for simplicity.
- **Jest:** All the unit tests and integration test are written using Jest framework for ensuring the correctness of the codebase.

## Installation


1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo/task-management-app.git
   ```

2. Navigate to the project directory:

   ```bash
   cd task-management-app
   ```
2. Install dependencies:

   ```bash
   npm install
   ```

## Usage

1. Build the project:

   ```bash
   npm run build
   ```
2. Start the server:

   ```bash
   npm start
   ```
3. Access the application: 
<br><br>
   The application will be available at http://localhost:3000.


## API Endpoints

- `POST /users`: Create a new user.
 - Response: `{ "id": "user_id" }`
- `POST /users/:user_id/tasks`: Create a new task for the specified user.
   <br><br>
   Request body: 
   ```bash
   {
    "title": "Task Title",
    "description": "Task Description",
    "dueDate": "2024-06-02",
    "status": "To Do"
   }
   ```

   Response: 
   ```bash
   {
    "id": "task_id",
    "title": "Task Title",
    "description": "Task Description",
    "dueDate": "2024-06-02",
    "status": "To Do"
   }
   ```
- `GET /users/:user_id/tasks`: Retrieve all tasks for the specified user.
   <br><br>
   Response: 
   ```bash
   [
    {
     "id": "task_id",
     "title": "Task Title",
     "description": "Task Description",
     "dueDate": "2024-06-02",
     "status": "To Do"
    }
   ]

   ```
- `GET /users/:user_id/tasks/:task_id`: Retrieve a specific task for the specified user.
   <br><br>
   Response: 
   ```bash
   {
    "id": "task_id",
    "title": "Task Title",
    "description": "Task Description",
    "dueDate": "2024-06-02",
    "status": "To Do"
   }
   ```
- `PUT /users/:user_id/tasks/:task_id`: Update a specific task for the specified user.
   <br><br>
   Request body: 
   ```bash
   {
    "title": "Updated Task Title",
    "description": "Updated Task Description",
    "dueDate": "2024-12-31",
    "status": "In Progress"
   }
   ```
   Response: 
   ```bash
   {
    "id": "task_id",
    "title": "Updated Task Title",
    "description": "Updated Task Description",
    "dueDate": "2024-12-31",
    "status": "In Progress"
   }

   ```
- `DELETE /users/:user_id/tasks/:task_id`: Delete a specific task for the specified user.
 - Response: `204 No Content`

## Testing

Run the test suite with the following command:

   ```bash
   npm test
   ```

## Project Structure


```plaintext
Root-Directory/
├── src/
│   ├── db/
│   │   └── Database.ts
│   │
│   ├── effects/
│   │   ├── CreateTaskEffect.ts
│   │   ├── GetTasksEffect.ts
│   │   ├── GetTaskByIDEffect.ts
│   │   ├── UpdateTaskEffect.ts
│   │   └── DeleteTaskEffect.ts
│   │ 
│   ├── models/
│   │   ├── User.ts
│   │   └── Task.ts
│   │
│   ├── routes/
│   │   ├── users.ts
│   │   ├── tasks.ts
│   │   └── __tests__/
│   │
│   └── server.ts
│   
├── jest.config.js
├── package.json
├── tsconfig.json
└── README.md


