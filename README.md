# **Contact Management System**

## **Description**

The Contact Management System is a web application designed to efficiently manage contact information, such as names, emails, phone numbers, companies, and job titles. The app enables users to add, view, and delete contacts through an intuitive and user-friendly interface. It is built with React (for the client) and Node.js (for the server), using Material-UI for styling.

The app supports pagination for seamless browsing and provides a modal-based form for adding new contacts. Data is fetched from a backend API and stored in a database (e.g., MongoDB).

---

## **Features**
- Add new contacts using a modal form.
- View a list of all contacts in a paginated table.
- Delete contacts with a single click.
- Responsive and modern UI styled with Material-UI.
- Backend API for managing CRUD operations.

---

## **Getting Started**

### **Prerequisites**
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

---

### **Setup**
### **Challenges and Resolutions**

Challenge 1: Implementing Pagination
Problem: Ensuring efficient data fetching for large datasets.
Solution: Added a limit and page query parameter to API requests. The backend returns paginated data, minimizing data sent to the client.

Challenge 2: Modal Form Validation
Problem: Preventing submission of incomplete or invalid contact details.
Solution: Used Material-UI’s TextField with validation rules (e.g., required fields) to ensure only valid inputs are submitted.

Challenge 3: Cross-Origin Resource Sharing (CORS)
Problem: Requests from the client to the server were blocked due to CORS.
Solution: Configured the backend to use the cors middleware, allowing requests from the client’s origin.

1. Clone the repository:
   ```bash
  
   cd contact-management-system
   cd client
   npm start

   cd server
   node index.js

  
