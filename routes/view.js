const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth");

router.get("/view", (req, res) => res.render("view"));

var mymap = L.map("mapid").setView([51.505, -0.09], 13);

L.tileLayer(
  "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw",
  {
    maxZoom: 18,
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
      '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
      'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: "mapbox.streets"
  }
).addTo(mymap);

L.marker([15.49717, 73.825003])
  .addTo(mymap)
  .bindPopup("<b>This is the desired location")
  .openPopup();

var points = [
  {
    x: 15.494828,
    y: 73.820744
  },
  {
    x: 15.494761,
    y: 73.820567
  },
  {
    x: 15.494864,
    y: 73.820534
  }
];

for (var i = 0; i < points.length; i++) {
  L.circle([points[i].x, points[i].y], 1, {
    color: "red",
    fillColor: "#f03",
    fillOpacity: 0.5
  })
    .addTo(mymap)
    .bindPopup(" <b> This is the pothole zone");
}

var popup = L.popup();

function onMapClick(e) {
  popup
    .setLatLng(e.latlng)
    .setContent("You clicked the map at " + e.latlng.toString())
    .openOn(mymap);
}

mymap.on("click", onMapClick);

module.exports = router;