document.getElementById("journey-form").addEventListener("submit", (e) => {
    e.preventDefault();

    // Collect user inputs
    const origin = document.getElementById("origin").value;
    const destination = document.getElementById("destination").value;
    const departureDate = document.getElementById("departure-date").value;
    const returnDate = document.getElementById("return-date").value;
    const numberOfPax = parseInt(document.getElementById("number-of-pax").value);

    // Basic validation
    if (new Date(returnDate) <= new Date(departureDate)) {
        alert("Return date must be after departure date!");
        return;
    }

    if (origin === destination) {
        alert("Origin and Destination cannot be the same!");
        return;
    }

    // Save details to session storage for the next page
    sessionStorage.setItem("origin", origin);
    sessionStorage.setItem("destination", destination);
    sessionStorage.setItem("departureDate", departureDate);
    sessionStorage.setItem("returnDate", returnDate);
    sessionStorage.setItem("numberOfPax", numberOfPax);

    window.location.href = "train-selection.html";
});
