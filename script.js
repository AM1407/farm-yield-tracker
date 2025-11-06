// === ELEMENT SELECTION ===
const nameInput = document.getElementById('nameInput');
const speciesInput = document.getElementById('speciesInput');
const yieldInput = document.getElementById('yieldInput');
const submitBtn = document.getElementById('submitBtn');

// Totals output fields
const cowTotal = document.getElementById('cowTotal');
const chickenTotal = document.getElementById('chickenTotal');
const goatTotal = document.getElementById('goatTotal');

// Check connections
console.log(nameInput, speciesInput, yieldInput, submitBtn);


submitBtn.addEventListener("click", () => {
  const name = nameInput.value.trim();
  const species = speciesInput.value.trim();
  const yieldAmount = Number(yieldInput.value);

  console.log(`Name: ${name}, Species: ${species}, Yield: ${yieldAmount}`);
});

const speciesOptions = document.querySelectorAll(".species-option");

speciesOptions.forEach(option => {
  option.addEventListener("click", () => {
    speciesInput.value = option.textContent; // fill the input
  });
});


let farmData = []; // Array of objects

submitBtn.addEventListener("click", () => {
  const name = nameInput.value.trim();
  const species = speciesInput.value.trim();
  const yieldAmount = Number(yieldInput.value);

  if (!name || !species || !yieldAmount) {
    alert("Please fill all fields before submitting.");
    return;
  }

  // Store new entry
  farmData.push({ name, species, yield: yieldAmount });

  // Update totals on the right
  updateTotals();

  // Save to localStorage
  saveData();

  // Clear input fields
  nameInput.value = "";
  speciesInput.value = "";
  yieldInput.value = "";
});



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

function saveData() {
  localStorage.setItem("farmData", JSON.stringify(farmData));
}

function loadData() {
  const stored = localStorage.getItem("farmData");
  if (stored) {
    farmData = JSON.parse(stored);
    updateTotals();
  }
}

// Load saved data when page opens
loadData();




