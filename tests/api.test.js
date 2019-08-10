'use strict';

const request = require('supertest');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

const app = require('../src/app')(db);
const buildSchemas = require('../src/schemas');

describe('API tests', () => {
    before((done) => {
        db.serialize((err) => { 
            if (err) {
                return done(err);
            }
            buildSchemas(db);

            done();
        });
    });

    describe('GET /health', () => {
        it('should return health', (done) => {
            request(app)
                .get('/health')
                .expect('Content-Type', /text/)
                .expect(200, done);
        });
    });

    describe('POST /rides', () => {
        it('should return rides information with id 1', (done) => {
            request(app)
                .post('/rides')
                .send({start_lat: 0, start_long: 0, end_lat:10, end_long:10, rider_name:'santoso', driver_name:'supri', driver_vehicle:'keranda mayat'})
                .expect('Content-Type', /json/)
                .expect(200, done);
        });
        it('should return error with message start latitude or longitude validation error', (done) => {
            request(app)
                .post('/rides')
                .send({start_lat: -100, start_long: -100, end_lat:10, end_long:10, rider_name:'santoso', driver_name:'supri', driver_vehicle:'keranda mayat'})
                .expect('Content-Type', /json/)
                .expect(200, done);
        });
        it('should return error with message stop latitude or longitude validation error', (done) => {
            request(app)
                .post('/rides')
                .send({start_lat: 0, start_long: 0, end_lat:-100, end_long:-100, rider_name:'santoso', driver_name:'supri', driver_vehicle:'keranda mayat'})
                .expect('Content-Type', /json/)
                .expect(200, done);
        });
        it('should return error with message rider name validation error', (done) => {
            request(app)
                .post('/rides')
                .send({start_lat: 0, start_long: 0, end_lat:10, end_long:10, rider_name:666, driver_name:'supri', driver_vehicle:'keranda mayat'})
                .expect('Content-Type', /json/)
                .expect(200, done);
        });
        it('should return error with message driver name validation error', (done) => {
            request(app)
                .post('/rides')
                .send({start_lat: 0, start_long: 0, end_lat:10, end_long:10, rider_name:'santoso', driver_name:666, driver_vehicle:'keranda mayat'})
                .expect('Content-Type', /json/)
                .expect(200, done);
        });
        it('should return error with message vehicle name validation error', (done) => {
            request(app)
                .post('/rides')
                .send({start_lat: 0, start_long: 0, end_lat:10, end_long:10, rider_name:'santoso', driver_name:'supri', driver_vehicle:666})
                .expect('Content-Type', /json/)
                .expect(200, done);
        });
    });

    describe('GET /rides', () => {
        it('should return all rides information', (done) => {
            request(app)
                .get('/rides')
                .expect('Content-Type', /json/)
                .expect(200, done);
        });
        it('should return all rides skip 1', (done) => {
            request(app)
                .get('/rides?skip=1')
                .expect('Content-Type', /json/)
                .expect(200, done);
        });
        it('should return all rides limit 1', (done) => {
            request(app)
                .get('/rides?limit=1')
                .expect('Content-Type', /json/)
                .expect(200, done);
        });
        it('should return all rides limit 1 skip 1', (done) => {
            request(app)
                .get('/rides?limit=1&skip=1')
                .expect('Content-Type', /json/)
                .expect(200, done);
        });
    });

    describe('GET /rides/1', () => {
        it('should return rides information with id 1', (done) => {
            request(app)
                .get('/rides/1')
                .expect('Content-Type', /json/)
                .expect(200, done);
        });
        it('ensuring vulnerability with non-integer id', (done) => {
            request(app)
                .get('/rides/a')
                .expect('Content-Type', /json/)
                .expect(200, done);
        });
    }); 
});