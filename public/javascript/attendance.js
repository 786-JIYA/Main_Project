
// window.addEventListener("DOMContentLoaded", () => {
//     fetch("http://192.168.13.153:5000/api/attendance")
//         .then(res => res.json())
//         .then(data => {
//             const tbody = document.getElementById("attendanceBody");
//             data.forEach(entry => {
//                 const dateObj = new Date(entry.time);
//                 const day = String(dateObj.getDate()).padStart(2, '0');
//                 const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // months are 0-based
//                 const year = dateObj.getFullYear();
//                 const date = `${month}/${day}/${year}`;  // Format as MM/DD/YYYY
//                 if(entry.uid=="e3d82a13"){
//                     entry.uid="Jiya";

//                 }

//                 // Check the checkbox corresponding to the current UID and date dynamically
//                 const checkbox = document.querySelector(`input[data-uid="${entry.uid}"][data-date="${date}"]`);

//                 if (checkbox) {
//                     checkbox.checked = true; // Check the checkbox
//                 }

//                 const row = `<tr>
//                 <td>${entry.uid}</td>
//                 <td>Present</td>
//                 <td>${new Date(entry.time).toLocaleString()}</td>
//             </tr>`;
//             const present=`
//             <tr><td>Present</td></tr>
//             `


//                 // if(entry.uid=="Jiya"){

//                     tbody.innerHTML += row;


//             });
//         })
//         .catch(err => {
//             console.error("Error fetching attendance:", err);
//         });
// });




window.addEventListener("DOMContentLoaded", () => {
    const students = [
        { name: "Jiya", uid: "e3d82a13" },
        { name: "Srushti", uid: "6329d9b" },
        { name: "Aman", uid: "4f6d1a7b" }
        // Add more students here
    ];

    fetch("http://192.168.229.153:5000/api/attendance")
        .then(res => res.json())
        .then(data => {
            const headerRow = document.getElementById("tableHeader");
            const tbody = document.getElementById("attendanceBody");
            const article = document.getElementById("article");
            tbody.innerHTML = "";

            // Step 1: Get all unique dates
            const dateMap = new Map(); // date => array of UIDs present
            data.forEach(entry => {
                const dateObj = new Date(entry.time);
                const day = String(dateObj.getDate()).padStart(2, '0');
                const month = String(dateObj.getMonth() + 1).padStart(2, '0');
                const year = dateObj.getFullYear();
                const formattedDate = `${month}/${day}/${year}`;

                if (!dateMap.has(formattedDate)) {
                    dateMap.set(formattedDate, []);
                }
                dateMap.get(formattedDate).push(entry.uid);
            });

            const sortedDates = Array.from(dateMap.keys()).sort(); // Optional: sort dates

            // Step 2: Add date headers
            sortedDates.forEach(date => {
                const th = document.createElement("th");
                th.innerText = date;
                headerRow.appendChild(th);
            });

            // Step 3: Build student rows
            students.forEach(student => {
                let row = `<tr><td>${student.name}</td><td>${student.uid}</td>`;
                sortedDates.forEach(date => {
                    const presentUIDs = dateMap.get(date);
                    const status = presentUIDs.includes(student.uid) ? "✅" : "❌";
                    row += `<td>${status}</td>`;
                });
                row += `</tr>`;
                tbody.innerHTML += row;

                // const info = `<tr>
                //          <td>${entry.uid}</td>

                //         <td>${new Date(entry.time).toLocaleString()}</td>
                //   </tr>`;
                // article.innerHTML += info;
            });
        })
        .catch(err => {
            console.error("Error fetching attendance:", err);
        });
});
