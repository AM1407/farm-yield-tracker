console.log("FarmYieldTool - Forms page loaded ✅");

const tableBody = document.getElementById("tableBody");
const clearBtn = document.getElementById("clearData");

// Load stored data from localStorage
function loadTableData() {
  const stored = localStorage.getItem("farmData");
  if (!stored) return;

  const farmData = JSON.parse(stored);

  tableBody.innerHTML = "";

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

// Clear data button
clearBtn.addEventListener("click", () => {
  if (confirm("Are you sure you want to delete all records?")) {
    localStorage.removeItem("farmData");
    tableBody.innerHTML = "";
  }
});

// Load data on page start
loadTableData();
