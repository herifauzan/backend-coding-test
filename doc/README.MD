# DOCUMENTATION

## Rides Information API

This is a simple server to create and get information about riding activity.<br>
For API documentation website run 'npm start' in 'swagger' folder, then open 'localhost:8020/docs'

## SERVICES
1. To Check Server Health<br>
- REQUEST
METHOD: **GET**<br>
URL   : **/health**<br>
- RESPONSE
STATUS: **200**<br>
MESSAGE: **Healthy**
2. To Retrieve All Rides
- REQUEST
METHOD: **GET**<br>
URL: **/rides**<br>
QUERY:**skip,limit**(optional for pagination)
- RESPONSE
STATUS: **200**<br>
MESSAGE: **JSON Object**<br>
3. To Retrieve Ride with specific id<br>
- REQUEST
METHOD: **GET**<br>
URL: **/rides/{id}**<br>
- RESPONSE
STATUS: **200**<br>
MESSAGE: **JSON Object**<br>
4. To create a new ride information<br>
- REQUEST
METHOD: **POST**<br>
URL: **/rides**<br>
BODY: **start_lat, start_long, end_lat, end_long, rider_name, driver_name, driver_vehicle**
- RESPONSE
STATUS: **200**<br>
MESSAGE: **JSON Object**<br>