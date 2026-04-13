// fetch("https://rfid-attendance-vaef.onrender.com/api/attendance")
//     .then(res => res.json())
//     .then(data => {
//         const tbody = document.getElementById("attendanceBody");
//         data.forEach(entry => {
//             if (entry.uid == "E24BF006") {
//                 entry.uid = "Jiya"


//             } if (entry.uid == "6A974F06") {
//                 entry.uid = "Srushti"
//             }

//             // const dateObj = new Date(entry.time);
//             // const date = dateObj.toISOString().split("T")[0];
//             //const dateObj = new Date(entry.time);
//             //const dateObj = new Date(Number(entry.time));
//             const dateObj = new Date(entry.time);
//             const day = String(dateObj.getDate()).padStart(2, '0');
//             const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // months are 0-based
//             const year = dateObj.getFullYear();
//             const date = `${month}/${day}/${year}`; // or use `${day}-${month}-${year}` if needed




//             const row = `<tr>
//       <td>${entry.uid}</td>
     
//       <td>${new Date(Number(entry.time)).toLocaleString()}</td>
//     </tr>`;


//             tbody.innerHTML += row;
//         });
//     })
//     .catch(err => {
//         console.error("Error fetching attendance:", err);
//     });

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