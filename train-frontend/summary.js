const summaryContent = document.getElementById("summary-content");
const proceedPaymentButton = document.getElementById("proceed-payment");

const origin = sessionStorage.getItem("origin");
const destination = sessionStorage.getItem("destination");
const departureDate = sessionStorage.getItem("departureDate");
const returnDate = sessionStorage.getItem("returnDate");
const numPax = sessionStorage.getItem("numberOfPax");
const selectedTrain = JSON.parse(sessionStorage.getItem("selectedTrain"));
const selectedCoach = sessionStorage.getItem("selectedCoach");
const selectedSeats = JSON.parse(sessionStorage.getItem("selectedSeats"));

const bookingData = JSON.parse(sessionStorage.getItem("bookingData"));

function renderSummary() {

    const totalPrice = bookingData.numberOfPax * bookingData.selectedTrain.price; // Calculate total price

    summaryContent.innerHTML = `
        <p><strong>Origin:</strong> ${bookingData.origin}</p>
        <p><strong>Destination:</strong> ${bookingData.destination}</p>
        <p><strong>Departure Date:</strong> ${bookingData.departureDate}</p>
        <p><strong>Return Date:</strong> ${bookingData.returnDate}</p>
        <p><strong>Number of Passengers:</strong> ${bookingData.numberOfPax}</p>
        <p><strong>Train:</strong> Train ${bookingData.selectedTrain.id} (${bookingData.selectedTrain.time})</p>
        <p><strong>RM:</strong> ${totalPrice} </p> 
        <p><strong>Coach:</strong> ${bookingData.selectedCoach}</p>
        <p><strong>Seats:</strong> ${bookingData.selectedSeats.join(", ")}</p>
    `;
}

proceedPaymentButton.addEventListener("click", () => {
    window.location.href = "payment.html";
});

renderSummary();
