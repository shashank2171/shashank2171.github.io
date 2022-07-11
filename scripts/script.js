var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = dd + '-' + mm + '-' + yyyy;

document.getElementById("name").innerHTML = "<h2>Shashank Patel</h2>";
document.getElementById("roll").innerHTML = "<h2>201500645</h2>";
document.getElementById("univ").innerHTML = "<h2>GLA University, Mathura</h2>";
document.getElementById("date").innerHTML = "<h2>" + today + "</h2>";