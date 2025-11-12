// === ELEMENT SELECTION ===
// This file is ONLY for index.html
const farmForm = document.getElementById('farm-form'); // Get the FORM
const nameInput = document.getElementById('nameInput');
const speciesInput = document.getElementById('speciesInput');
const yieldInput = document.getElementById('yieldInput');

// Totals output fields
const cowTotal = document.getElementById('cowTotal');
const chickenTotal = document.getElementById('chickenTotal');
const goatTotal = document.getElementById('goatTotal');

// Species dropdown logic
const speciesOptions = document.querySelectorAll(".species-option");
speciesOptions.forEach(option => {
    option.addEventListener("click", () => {
        speciesInput.value = option.textContent; // fill the input
    });
});

// === DATA HANDLING ===

// This is your "JS Database" array
let farmData = [];

// Main listener is now on the FORM's 'submit' event
farmForm.addEventListener("submit", (e) => {
    // Stop the form from refreshing the page
    e.preventDefault();

    const name = nameInput.value.trim();
    const species = speciesInput.value.trim();
    const yieldAmount = Number(yieldInput.value);

    // Validation
    if (!name || !species || !yieldInput.value) {
        alert("Please fill all fields before submitting.");
        return;
    }

    // 1. Create the new data object
    const newAnimalEntry = {
        name: name,
        species: species,
        yield: yieldAmount
    };

    // 2. [ORIGINAL] Add to your JS database
    farmData.push(newAnimalEntry);

    // 3. [ORIGINAL] Update totals on the right
    updateTotals();

    // 4. [ORIGINAL] Save to localStorage
    saveDataToLocalStorage();

    // 5. [NEW!] Send to json-server API
    sendDataToApi(newAnimalEntry);

    // 6. [ORIGINAL] Clear input fields
    farmForm.reset(); // This is a simpler way to clear the form
});

/**
 * [NEW!] This function sends data to your json-server
 */
async function sendDataToApi(animalData) {
    const apiURL = 'http://localhost:3000/animals'; // The endpoint in db.json

    console.log("Sending data to API:", animalData);

    try {
        const response = await fetch(apiURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(animalData)
        });

        if (!response.ok) {
            throw new Error(`API error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Success! API responded with:', data);
        
    } catch (error) {
        console.error('Error sending data to API:', error);
        alert('Error: Could not save to json-server. Is it running?');
    }
}


/**
 * [ORIGINAL] Updates the total counters on the right side
 */
function updateTotals() {
    const cowSum = farmData
        .filter(a => a.species === "Cow")
        .reduce((sum, a) => sum + a.yield, 0);

    const chickenSum = farmData
        .filter(a => a.species === "Chicken")
        .reduce((sum, a) => sum + a.yield, 0);

    const goatSum = farmData
        .filter(a => a.species === "Goat")
        .reduce((sum, a) => sum + a.yield, 0);

    cowTotal.value = cowSum;
    chickenTotal.value = chickenSum;
    goatTotal.value = goatSum;
}

/**
 * [ORIGINAL] Saves the farmData array to localStorage
 */
function saveDataToLocalStorage() {
    localStorage.setItem("farmData", JSON.stringify(farmData));
}

/**
 * [ORIGINAL] Loads data from localStorage into the array
 */
function loadDataFromLocalStorage() {
    const stored = localStorage.getItem("farmData");
    if (stored) {
        farmData = JSON.parse(stored);
        updateTotals();
    }
}

// Load saved data from localStorage when page opens
loadDataFromLocalStorage();