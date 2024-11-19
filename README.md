# Train-ticket-booking
A simple and a real time train ticket booking

## Install Required Dependencies

Before running the backend server, install the necessary Node.js packages. (node modules)

in the terminal : npm install mongo cors express

Train Ticket Booking 

This project is a simple train booking system with a frontend and backend. The backend is built with Node.js and connects to a MongoDB database.

-Folder Structure
train/
│
├── train-frontend/   # Frontend code (HTML, CSS, JavaScript)
└── train-backend/    # Backend code (Node.js, Express)

1.Before running the application, ensure you have the following installed:
  -Node.js (latest version)
  -MongoDB
Also, make sure you save the train folder and Node.js installation on the C drive.

2.Setup Instructions
 *Set Up MongoDB
  -Open MongoDB Compass.
  -Create a connection using the following URI:
   mongodb://localhost:27017
  -Save and continue.

3.Run the Backend Server
  -Open your preferred IDE (Visual Studio Code is recommended).
  -Navigate to the train-backend directory in the terminal:
   cd train-backend
  -Start the server:
   node server.js
  -If successful, you should see the following messages in the terminal:
   Server running on http://localhost:3000
   Connected to MongoDB

4.View the Database
  -Open MongoDB Compass.
  -Ensure you are connected to the mongodb://localhost:27017.
  -Open the MongoDB Shell in Compass and type the following commands:
   use trainBookingApp
   db.bookings.find()
  -Alternatively, navigate to the trainBookingApp database in the UI, select the bookings collection, and view the     saved booking details.

5.Additional Notes
  -Make sure MongoDB is running on your machine before starting the server.
  

