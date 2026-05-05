
fetch("https://rfid-attendance-vaef.onrender.com/api/attendance")
    .then(res => res.json())
    .then(data => {

        const tbody = document.getElementById("attendanceBody");
        tbody.innerHTML = "";

        data.forEach(entry => {

            // ✅ Normalize UID
            const uid = entry.uid.toLowerCase();

            let name = uid;

            if (uid === "e24bf006") {
                name = "Jiya";
            } else if (uid === "6a974f06") {
                name = "Srushti";
            }

            // ✅ FIXED DATE
            const dateObj = new Date(entry.time);

            if (isNaN(dateObj)) return; // safety

            const formattedTime = dateObj.toLocaleString();

            const row = `<tr>
                <td>${name}</td>
                <td>${formattedTime}</td>
            </tr>`;

            tbody.innerHTML += row;
        });
    })
    .catch(err => {
        console.error("❌ Error fetching attendance:", err);
    });