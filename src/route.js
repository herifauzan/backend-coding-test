module.exports = {
    createRide : async (req, res) => {
        let result = await promiseCreate(req.body.start_lat, req.body.start_long, req.body.end_lat, req.body.end_long, req.body.rider_name, req.body.driver_name, req.body.driver_vehicle);
        res.send(result);
    },
    getRides : async (req, res) => {
        let result = await promiseGetAll(req.query.skip, req.query.limit);
        res.send(result);
    },
    getRideById : async (req, res) => {
        let result = await promiseGetById(req.params.id);
        res.send(result);
    }
}
function promiseGetAll(off, lim){
    return new Promise((resolve, reject)=>{
        var offset = 0
        var limit  = 2
        var query  = 'SELECT * FROM Rides ORDER BY rideId'
        try{
            if(lim){
                limit  = parseInt(lim)
                query = query + ' LIMIT '+limit
                if(off){
                    offset = parseInt(off)
                    query = query + ' OFFSET '+offset
                }
            }
            else{
                if(off){
                    offset = parseInt(off)
                    query = query + ' LIMIT -1 OFFSET '+offset
                }
            }            
        }
        finally{
            db.all(query, function (err, rows) {
                if (err) {
                    reject({
                        error_code: 'SERVER_ERROR',
                        message: 'Unknown error'
                    });
                }

                if (rows.length === 0) {
                    reject({
                        error_code: 'RIDES_NOT_FOUND_ERROR',
                        message: 'Could not find any rides'
                    });
                }

                resolve(rows);
            });
        }
    })
}
function promiseGetById(id){
    return new Promise((resolve,reject)=>{
        db.all('SELECT * FROM Rides WHERE rideID='+id, function (err, rows) {
            if (err) {
                reject({
                    error_code: 'SERVER_ERROR',
                    message: 'Unknown error'
                });
            }

            if (rows.length === 0) {
                reject({
                    error_code: 'RIDES_NOT_FOUND_ERROR',
                    message: 'Could not find any rides'
                });
            }

            resolve(rows);
        });
    })
}
function promiseCreate(startLat, startLong,endLat, endLong, rdrName, drvName, vehicleName){
    return new Promise((resolve, reject)=>{
        const startLatitude = Number(startLat);
        const startLongitude = Number(startLong);
        const endLatitude = Number(endLat);
        const endLongitude = Number(endLong);
        const riderName = rdrName;
        const driverName = drvName;
        const driverVehicle = vehicleName;

        if (startLatitude < -90 || startLatitude > 90 || startLongitude < -180 || startLongitude > 180) {
            reject({
                error_code: 'VALIDATION_ERROR',
                message: 'Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively'
            });
        }

        if (endLatitude < -90 || endLatitude > 90 || endLongitude < -180 || endLongitude > 180) {
            reject({
                error_code: 'VALIDATION_ERROR',
                message: 'End latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively'
            });
        }

        if (typeof riderName !== 'string' || riderName.length < 1) {
            reject({
                error_code: 'VALIDATION_ERROR',
                message: 'Rider name must be a non empty string'
            });
        }

        if (typeof driverName !== 'string' || driverName.length < 1) {
            reject({
                error_code: 'VALIDATION_ERROR',
                message: 'Rider name must be a non empty string'
            });
        }

        if (typeof driverVehicle !== 'string' || driverVehicle.length < 1) {
            reject({
                error_code: 'VALIDATION_ERROR',
                message: 'Rider name must be a non empty string'
            });
        }

        var values = [startLatitude, startLongitude, endLatitude, endLongitude, riderName, driverName, driverVehicle];
        
        db.run('INSERT INTO Rides(startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES (?, ?, ?, ?, ?, ?, ?)', values, function (err) {
            if (err) {
                reject({
                    error_code: 'SERVER_ERROR',
                    message: 'Unknown error'
                });
            }

            db.all('SELECT * FROM Rides WHERE rideID = ?', this.lastID, function (err, rows) {
                if (err) {
                    reject({
                        error_code: 'SERVER_ERROR',
                        message: 'Unknown error'
                    });
                }

                resolve(rows);
            });
        });
    });
}