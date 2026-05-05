
window.addEventListener("DOMContentLoaded", () => {

    const students = [
        { name: "Jiya", uid: "6a974f6" },
        { name: "Srushti", uid: "e24bf06" },
        { name: "Aman", uid: "4f6d1a7b" }
    ];

    fetch("https://rfid-attendance-vaef.onrender.com/api/attendance")
        .then(res => res.json())
        .then(data => {

            const headerRow = document.getElementById("tableHeader");
            const tbody = document.getElementById("attendanceBody");

            // 🔥 Reset table
            headerRow.innerHTML = "<th>Name</th><th>UID</th>";
            tbody.innerHTML = "";

            // 📅 Map: date → unique UID set
            const dateMap = new Map();

            data.forEach(entry => {

                const dateObj = new Date(entry.time);
                if (isNaN(dateObj)) return;

                // ✅ BEST FORMAT (no duplicates)
                const formattedDate = dateObj.toISOString().split('T')[0]; // YYYY-MM-DD

                if (!dateMap.has(formattedDate)) {
                    dateMap.set(formattedDate, new Set()); // 🔥 use Set
                }

                dateMap.get(formattedDate).add(entry.uid.toLowerCase());
            });

            const sortedDates = Array.from(dateMap.keys()).sort((a, b) => {
                return new Date(a) - new Date(b);
            });

            sortedDates.forEach(date => {
                const th = document.createElement("th");
                th.innerText = date;
                headerRow.appendChild(th);
            });

            students.forEach(student => {

                let row = `<tr>
                    <td>${student.name}</td>
                    <td>${student.uid}</td>`;

                sortedDates.forEach(date => {
                    const presentUIDs = dateMap.get(date);

                    const status = presentUIDs.has(student.uid.toLowerCase())
                        ? "✅"
                        : "❌";

                    row += `<td>${status}</td>`;
                });

                row += `</tr>`;
                tbody.innerHTML += row;
            });

        })
        .catch(err => {
            console.error("❌ Error fetching attendance:", err);
        });
});
