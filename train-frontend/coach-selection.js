const coachList = document.getElementById("coach-list");
const confirmCoachButton = document.getElementById("confirm-coach");

const coaches = ["A", "B", "C", "D", "E", "F"];
let selectedCoach = null;

function renderCoaches() {
    coachList.innerHTML = "";
    coaches.forEach((coach) => {
        const coachDiv = document.createElement("div");
        coachDiv.className = "train-option";
        coachDiv.textContent = `Coach ${coach}`;
        coachDiv.dataset.id = coach;

        coachDiv.addEventListener("click", () => {
            document.querySelectorAll(".train-option").forEach((el) => el.classList.remove("selected"));
            coachDiv.classList.add("selected");
            selectedCoach = coach;
            confirmCoachButton.disabled = false;
        });

        coachList.appendChild(coachDiv);
    });
}

confirmCoachButton.addEventListener("click", () => {
    if (!selectedCoach) return;

    // Save Coach Info
    sessionStorage.setItem("selectedCoach", selectedCoach);
    window.location.href = "seat-selection.html";
});

// train animation 
document.addEventListener("DOMContentLoaded", () => {
    const trainContainer = document.querySelector(".train-container");
    trainContainer.style.animation = "none"; 
    setTimeout(() => {
        trainContainer.style.animation = ""; 
    }, 10); 
});

renderCoaches();
