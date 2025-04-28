fetch("http://192.168.229.153:5000/api/attendance")
    .then(res => res.json())
    .then(data => {
        const tbody = document.getElementById("attendanceBody");
        data.forEach(entry => {
            if (entry.uid == "e3d82a13") {
                entry.uid = "Jiya"


            } if (entry.uid == "6329d9b") {
                entry.uid = "Srushti"
            }

            // const dateObj = new Date(entry.time);
            // const date = dateObj.toISOString().split("T")[0];
            const dateObj = new Date(entry.time);
            const day = String(dateObj.getDate()).padStart(2, '0');
            const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // months are 0-based
            const year = dateObj.getFullYear();
            const date = `${month}/${day}/${year}`; // or use `${day}-${month}-${year}` if needed




            const row = `<tr>
      <td>${entry.uid}</td>
      <td>${new Date(entry.time).toLocaleString()}</td>
    </tr>`;


            tbody.innerHTML += row;
        });
    })
    .catch(err => {
        console.error("Error fetching attendance:", err);
    });