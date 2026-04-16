const API_URL = "https://script.google.com/macros/s/AKfycbwJMs-vTzbfRBGzf4XweCRlZPy1ijb2q9OJyQBxyDQWNeeEBaXh04XhNPyB1uWNR-THew/exec";

async function fetchData() {
  const res = await fetch(API_URL);
  const data = await res.json();

  const tbody = document.querySelector("#table tbody");
  tbody.innerHTML = "";

  data.reverse().forEach(row => {
    const tr = `
      <tr>
        <td>${row.Date}</td>
        <td>${row["Employee ID"]}</td>
        <td>${row.Name}</td>
        <td>${row.Status}</td>
        <td>${row["Time In"]}</td>
        <td>${row["Time Out"]}</td>
      </tr>
    `;
    tbody.innerHTML += tr;
  });
}

async function submitData() {
  const data = {
    date: new Date().toISOString().split('T')[0],
    empId: document.getElementById("empId").value,
    name: document.getElementById("name").value,
    status: document.getElementById("status").value,
    timeIn: document.getElementById("timeIn").value,
    timeOut: document.getElementById("timeOut").value
  };

  await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify(data)
  });

  alert("Attendance Saved!");
  fetchData();
}

fetchData();
