//using Sokit.IO
var socket = io();

//button handler to submit the form
async function postData(elem) {
  let response = await fetch(elem.action, {
    method: elem.method,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(new FormData(elem)),
  });

  if (response.ok) {
    let formData = await response.json();
    console.log("submitted: " + JSON.stringify(formData));
    document.getElementById("big-gradient").classList.remove("is-hidden");
    //fetching and updating the data for charts
    fetchData().then((data) => {
      const currData = JSON.parse(data);
      updatePieChart(currData.pieChart);
      updateBarChart(currData.barChart);
      updateTreemap(currData.treemap);
      console.log("new fetched data: " + data);
    });
    socket.emit("toback", formData);
    socket.on("tofront", function (msg) {
      console.log("Got a socket message from server: " + msg);
    });
  } else {
    alert(response.status + " " + response.statusCode);
  }
}

//fetch current data
let fetchData = async () => {
  let response = await fetch("/surveys");

  if (response.ok) {
    let data = await response.json();
    return JSON.stringify(data);
    //console.log("new fetched data: " + currData);
  } else {
    alert(response.statusText + " " + response.statusCode);
    // document.getElementById("bookingsTableContent").innerHTML =
    //   "<tr><td>" + response.statusText + "</td></tr>";
  }
};

//the dropdown role selection
const roleSelected = (role) => {
  console.log(role + " was selected");
};
