// This file is ONLY for forms.html
console.log("FarmYieldTool - Forms page loaded ✅");

// --- This is the ONLY place these should be declared ---
const tableBody = document.getElementById("tableBody");
const clearBtn = document.getElementById("clearData");

/**
 * Loads data from localStorage and displays it in the table
 */
function loadTableData() {
    const stored = localStorage.getItem("farmData");
    if (!stored || JSON.parse(stored).length === 0) {
        tableBody.innerHTML = '<tr><td colspan="4" class="text-center">No records found.</td></tr>';
        return;
    }

    const farmData = JSON.parse(stored);

    tableBody.innerHTML = ""; // Clear existing rows

    farmData.forEach((entry, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
      <th scope="row">${index + 1}</th>
      <td>${entry.name}</td>
      <td>${entry.species}</td>
      <td>${entry.yield}</td>
    `;
        tableBody.appendChild(row);
    });
}

/**
 * Attaches the click listener to the clear button
 */
clearBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to delete all records from BOTH local storage AND the server?")) {
        
        // 1. [ORIGINAL] Clear localStorage (the "JS database")
        localStorage.removeItem("farmData");
        
        // 2. [ORIGINAL] Clear the HTML table
        tableBody.innerHTML = '<tr><td colspan="4" class="text-center">All records cleared.</td></tr>';

        // 3. [NEW!] Clear the json-server database
        clearJsonServer();
    }
});

/**
 * [NEW FUNCTION]
 * Clears all entries from the json-server by fetching
 * all items and then deleting them one by one.
 */
async function clearJsonServer() {
    const apiURL = 'http://localhost:3000/animals';
    
    try {
        console.log("Fetching all animals from server to delete them...");

        // 1. Get all animals currently on the server
        const response = await fetch(apiURL);
        if (!response.ok) throw new Error(`Failed to fetch animals: ${response.status}`);
        
        const animals = await response.json();

        if (animals.length === 0) {
            console.log("json-server is already empty.");
            return;
        }

        console.log(`Found ${animals.length} animals. Deleting all...`);

        // 2. Create an array of "delete" promises
        const deletePromises = animals.map(animal => 
            fetch(`${apiURL}/${animal.id}`, {
                method: 'DELETE'
            })
        );

        // 3. Wait for all delete requests to finish
        await Promise.all(deletePromises);

        console.log("Successfully cleared all items from json-server.");
        alert("All server records have been cleared.");

    } catch (error) {
        console.error("Error clearing json-server:", error);
        alert("Error: Could not clear server records. Is the server running?");
    }
}

// --- This is the ONLY place this should be called ---
// Load data on page start
loadTableData();