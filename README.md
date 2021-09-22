# geoAPI NodeJS API

This API returns if a point is in land or water, or which nation's territory (if any) a point is in. 

## Getting Started

```bash
clone the repository

Install nodejs

node geoapi.js

To create a systemd file to run this 

cp systemdfiles/geoapi.service /etc/systemd/system/geoapi.service

modify the exec start and working directory appropriately

systemctl enable geoapi.service
systemctl start geoapi.service 


Also edit the console.log message to match host name 
## Dependancies 

Should all be installed by npm:
- Turf.js
- Express


##usage
localhost:3000/lat/long/altitude


