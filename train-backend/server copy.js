//mongo setup
const { MongoClient } = require("mongodb");
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);
async function connectToDatabase() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error("Error connecting to MongoDB:", err.message);
        process.exit(1);
    }
}

connectToDatabase();

const db = client.db("trainBookingApp"); //this is the name in mongoCompass
const bookingsCollection = db.collection("bookings"); //the saved database for all the info

//express.js setup
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(cors());
app.use(bodyParser.json());

// Serve static files 
app.use(express.static(path.join(__dirname, "../train-frontend")));

const PORT = 3000;
const bookings = [];

//fetching booked seats
app.get("/getBookedSeats", async (req, res) => {
    const { 
        origin, 
        destination, 
        departureDate, 
        selectedTrain, 
        selectedCoach 
    } = req.query;

    try {
        const existingBookings = await bookingsCollection.find({
            origin,
            destination,
            departureDate,
            "selectedTrain.id": parseInt(selectedTrain), 
            selectedCoach,
        }).toArray();

        const bookedSeats = existingBookings.flatMap((booking) => booking.selectedSeats);
        res.json({ bookedSeats });
    } catch (err) {
        console.error("Error fetching booked seats:", err.message);
        res.status(500).json({ error: "Failed to fetch booked seats" });
    }
});

// confirm a booking
app.post("/confirmBooking", async (req, res) => {
    const {
        origin,
        destination,
        departureDate,
        returnDate,
        numberOfPax,
        selectedTrain,
        selectedCoach,
        selectedSeats,
        paymentDetails,
    } = req.body;

    try {
        // Check for conflicting bookings
        const existingBookings = await bookingsCollection.find({
            origin,
            destination,
            selectedTrain,
            selectedCoach,
            departureDate,
        }).toArray();

        const bookedSeats = existingBookings.flatMap((b) => b.selectedSeats);
        const overlappingSeats = selectedSeats.filter((seat) => bookedSeats.includes(seat));

        if (overlappingSeats.length > 0) {
            return res.status(400).json({
                error: `The following seats are already booked: ${overlappingSeats.join(", ")}`,
            });
        }

        // Save the final booking to the database
        const bookingData = {
            origin,
            destination,
            departureDate,
            returnDate,
            numberOfPax,
            selectedTrain,
            selectedCoach,
            selectedSeats,
            paymentDetails, 
            bookingDate: new Date(),
        };

        await bookingsCollection.insertOne(bookingData);
        res.json({ success: true, message: "Booking confirmed successfully!" });
    } catch (err) {
        console.error("Error confirming booking:", err.message);
        res.status(500).json({ error: "Failed to confirm booking. Please try again." });
    }
});

server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
