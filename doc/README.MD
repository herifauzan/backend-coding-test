# DOCUMENTATION

## Rides Information API

This is a simple server to create and get information about riding activity.<br>
For API documentation website run 'npm start' in 'swagger' folder, then open 'localhost:8020/docs'

## SERVICES
- To Check Server Health<br>
GET /health
- To Retrieve All Rides<br>
GET /rides
- To Retrieve Ride with specific id<br>
GET /rides/{id}
- To create a new ride information<br>
POST /rides