
# **Chirawit-Test**

## **Project Description**
Chirawit-Test is an API for managing expenses. Users can securely store, update, delete, and view their expenses, and generate reports categorized by spending. The project features user authentication, ensuring that only authorized users can access expense management functionality.

The API is live and accessible at:  
**[https://chirawit-test-614587273888.asia-southeast1.run.app/](https://chirawit-test-614587273888.asia-southeast1.run.app/)**

## **Table of Contents**
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Routes](#routes)
- [Postman Collection](#postman-collection)
- [Contributing](#contributing)
- [License](#license)

## **Installation**

To run the project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/kumal3east/chirawit-test.git
   ```

2. Navigate into the project directory:
   ```bash
   cd chirawit-test
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

4. Set up environment variables:
   ```bash
   cp .env.example .env
   ```

5. Run migrations (if applicable):
   ```bash
   node ace migration:run
   ```

6. Start the development server:
   ```bash
   npm run dev
   ```

## **Usage**

Once the server is running, you can interact with the API using the following base URL:
```plaintext
https://chirawit-test-614587273888.asia-southeast1.run.app
```

### **Example API Endpoints**
#### Register a User:
```bash
POST /api/v1/user/register
```

#### Login:
```bash
POST /api/v1/user/login
```

#### Create an Expense:
```bash
POST /api/v1/expenses/create
```

#### Generate an Expense Report by Category:
```bash
POST /api/v1/expenses/report
```

## **Features**
- User registration and login (JWT authentication).
- Full CRUD operations for managing expenses.
- Reports generated based on expense categories.
- Secure access to API routes via authentication middleware.

## **Routes**

### **User Management**
- **POST /api/v1/user/register** - Register a new user.
- **POST /api/v1/user/login** - Authenticate a user.

### **Expense Management**
- **POST /api/v1/expenses/create** - Create an expense.
- **POST /api/v1/expenses/read** - Retrieve expenses.
- **PUT /api/v1/expenses/update** - Update an expense.
- **DELETE /api/v1/expenses/delete** - Delete an expense.

### **Expense Reporting**
- **POST /api/v1/expenses/report** - Generate a report of expenses by category.

## **Postman Collection**

To make API testing easier, the Postman collection **AbbonTest.postman_collection.json** is included in the repository. You can import this collection into Postman and quickly test all the available endpoints.

**[Download AbbonTest.postman_collection.json](AbbonTest.postman_collection.json)**

The collection includes pre-configured requests for all routes, ensuring smooth interaction with the API.

## **Contributing**

Contributions are welcome! Please fork this repository and submit a pull request with your proposed changes. For major updates, kindly open an issue to discuss the changes first.
