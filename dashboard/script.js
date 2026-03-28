let tableData = [];

// Load CSV file
async function fetchData() {
    const response = await fetch("customers-100.csv");
    const data = await response.text();

    const rows = data.split("\n").slice(1); // skip header

    tableData = rows.map(row => {
        const cols = row.split(",");
        return {
            first_name: cols[0],
            last_name: cols[1],
            country: cols[3]
        };
    });

    displayData(tableData);
}

// Display data
function displayData(data) {
    const tableBody = document.querySelector("#dataTable tbody");
    tableBody.innerHTML = "";

    data.forEach((item, index) => {
        let row = `<tr>
            <td>${index + 1}</td>
            <td>${item.first_name}</td>
            <td>${item.last_name}</td>
            <td>${item.country}</td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}

// Search
document.getElementById("searchInput").addEventListener("keyup", function () {
    let value = this.value.toLowerCase();

    let filtered = tableData.filter(item =>
        item.first_name.toLowerCase().includes(value) ||
        item.last_name.toLowerCase().includes(value)
    );

    displayData(filtered);
});

// Run
fetchData();