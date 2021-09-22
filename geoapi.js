//initial setup
const express = require('express')
var turfHelp = require('@turf/helpers');
const booleanPointInPolygon = require('@turf/boolean-point-in-polygon').default;;
var fs = require('fs');
const app = express()
const port = 3000


var worldReadIn = turfHelp.multiPolygon(JSON.parse(fs.readFileSync('world.geo.json')));

worldReadIn = worldReadIn.geometry.coordinates.features


//fetches the lat long from the url in the API
app.get('/:lat/:long/:altitude', (req, res) => {
    console.log("Checking if Lat: " + req.params.lat + " Long: " + req.params.long + " is on water!");
    var point = turfHelp.point([req.params.long, req.params.lat]); //Swapped because JSON is too  
    res.set('Access-Control-Allow-Origin', '*');

    if (req.params.altitude == 0) {  //if the location is at sea level check if on water 
        //checks if point is within polygons for water v land
        for (let i = 0; i < worldReadIn.length; i++) {

            var coordinateArray = worldReadIn[i].geometry
            var inLand = booleanPointInPolygon(point, coordinateArray);
        //    console.log(inLand)

            if (inLand == true) {
                console.log(worldReadIn[i].properties.name)
                var countryName = worldReadIn[i].properties.name
                groundType = "Land"
                break
            }
            else if (inLand == false) {
                groundType = "Water"
                countryName = "International"
            }

        }
    } else {
        groundType = "Air"
    }
    res.send({countryName, groundType});

})


app.listen(port, '0.0.0.0', () => {
    console.log(`geoAPI listening at http://localhost:${port}`);
})