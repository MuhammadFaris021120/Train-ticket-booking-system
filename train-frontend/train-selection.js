const trainList = document.getElementById("train-list");
const confirmButton = document.getElementById("confirm-train");

const destination = sessionStorage.getItem("destination");
const departureDate = sessionStorage.getItem("departureDate");
const returnDate = sessionStorage.getItem("returnDate");

const trains = [
    { id: 1, time: "08:00 AM", duration: "3h", price: 45 },
    { id: 2, time: "10:00 AM", duration: "3h", price: 55 },
    { id: 3, time: "12:00 PM", duration: "3h", price: 40 },
    { id: 4, time: "02:00 PM", duration: "3h", price: 70 },
    { id: 5, time: "04:00 PM", duration: "3h", price: 60 },
];

let selectedTrain = null;

function renderTrains() {
    trainList.innerHTML = "";

    trains.forEach((train) => {
        const trainDiv = document.createElement("div");
        trainDiv.className = "train-option";
        trainDiv.dataset.id = train.id;

        const trainImage = document.createElement("img");
        trainImage.src = "image/train_without_background-removebg-preview.png"; // Reference the image directly
        trainImage.alt = `Train ${train.id}`;

        const trainInfo = document.createElement("div");
        trainInfo.innerHTML = `
            <p><strong>Train ${train.id}</strong></p>
            <p><b>Departure Time: </b>${train.time}</p>
            <p><b>Trip Duration: </b>${train.duration}</p>
            <p><b>Tciket Price: </b>RM ${train.price}</p>
        `;

        trainDiv.appendChild(trainImage);
        trainDiv.appendChild(trainInfo);

        trainDiv.addEventListener("click", () => {
            document.querySelectorAll(".train-option").forEach((el) => el.classList.remove("selected"));
            trainDiv.classList.add("selected");
            selectedTrain = train;
            confirmButton.disabled = false;
        });

        trainList.appendChild(trainDiv);
    });
}


confirmButton.addEventListener("click", () => {
    if (!selectedTrain) return;

    // Save Train Info
    sessionStorage.setItem("selectedTrain", JSON.stringify(selectedTrain));
    window.location.href = "coach-selection.html";
});

renderTrains();
