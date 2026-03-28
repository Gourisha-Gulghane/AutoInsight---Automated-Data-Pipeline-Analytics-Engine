// script.js
document.getElementById("load-btn").addEventListener("click", async () => {
    try {
        // Backend URL
        const response = await fetch("http://127.0.0.1:8000/data");
        const data = await response.json();

        // Get table body
        const tableBody = document.getElementById("table-body");
        tableBody.innerHTML = ""; // Clear previous data

        // Populate table
        data.forEach(row => {
            const tr = document.createElement("tr");

            const tdFirst = document.createElement("td");
            tdFirst.textContent = row["First Name"];
            tr.appendChild(tdFirst);

            const tdLast = document.createElement("td");
            tdLast.textContent = row["Last Name"];
            tr.appendChild(tdLast);

            const tdCountry = document.createElement("td");
            tdCountry.textContent = row["Country"];
            tr.appendChild(tdCountry);

            tableBody.appendChild(tr);
        });
    } catch (err) {
        console.error("Error fetching data:", err);
        alert("Data fetch failed! Check console.");
    }
});