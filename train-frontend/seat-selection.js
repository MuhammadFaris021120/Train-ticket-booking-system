const seatGrid = document.getElementById("seat-grid");
const confirmSeatButton = document.getElementById("confirm-seat");
const coachName = document.getElementById("coach-name");

// Retrieve data from sessionStorage
const selectedCoach = sessionStorage.getItem("selectedCoach");
const numPax = parseInt(sessionStorage.getItem("numberOfPax"), 10);
const username = sessionStorage.getItem("username");
let selectedSeats = new Set();

const seatsPerCoach = 20; // 20 seats

// Display the selected coach name
if (selectedCoach) {
    coachName.textContent = selectedCoach;
} else {
    alert("No coach selected. Redirecting to Coach Selection.");
    window.location.href = "coach-selection.html";
}

async function fetchBookedSeats() {
    const origin = sessionStorage.getItem("origin");
    const destination = sessionStorage.getItem("destination");
    const departureDate = sessionStorage.getItem("departureDate");
    const selectedTrain = JSON.parse(sessionStorage.getItem("selectedTrain")).id;
    const selectedCoach = sessionStorage.getItem("selectedCoach");

    try {
        const response = await fetch(`/getBookedSeats?origin=${origin}&destination=${destination}&departureDate=${departureDate}&selectedTrain=${selectedTrain}&selectedCoach=${selectedCoach}`);
        const data = await response.json();
        return data.bookedSeats || [];
    } catch (error) {
        console.error("Failed to fetch booked seats:", error);
        return [];
    }
}


async function renderSeats() {
    seatGrid.innerHTML = ""; 

    const bookedSeats = await fetchBookedSeats();

    for (let i = 1; i <= seatsPerCoach; i++) {
        const seatId = `${selectedCoach}${i}`;
        const seatDiv = document.createElement("div");
        seatDiv.className = "seat"; 
        seatDiv.textContent = seatId;

        // Mark seat as booked
        if (bookedSeats.includes(seatId)) {
            seatDiv.classList.add("booked");
        } else {
            seatDiv.classList.add("vacant");

            // Allow selection for vacant seats
            seatDiv.addEventListener("click", () => {
                if (selectedSeats.has(seatId)) {
                    
                    selectedSeats.delete(seatId);
                    seatDiv.classList.remove("selected");
                } else if (selectedSeats.size < numPax) {
                  
                    selectedSeats.add(seatId);
                    seatDiv.classList.add("selected");
                }

                // Update button state
                confirmSeatButton.disabled = selectedSeats.size !== numPax;
            });
        }

        seatGrid.appendChild(seatDiv);
    }
}


confirmSeatButton.addEventListener("click", () => {
    if (selectedSeats.size === numPax) {
        const bookingData = {
            origin: sessionStorage.getItem("origin"),
            destination: sessionStorage.getItem("destination"),
            departureDate: sessionStorage.getItem("departureDate"),
            returnDate: sessionStorage.getItem("returnDate"),
            numberOfPax: numPax,
            selectedTrain: JSON.parse(sessionStorage.getItem("selectedTrain")),
            selectedCoach,
            selectedSeats: [...selectedSeats],
        };

        // Save booking data temporarily in sessionStorage
        sessionStorage.setItem("bookingData", JSON.stringify(bookingData));

       
        window.location.href = "summary.html";
    } else {
        alert(`Please select exactly ${numPax} seat(s).`);
    }
});

renderSeats();
