//FORCE NODE_ENV = test
process.env.NODE_ENV = 'test';

const chaiHttp = require('chai-http');
const chai = require('chai').use(chaiHttp);
const expect = chai.expect;
const should = chai.should();
const mongoose = require('mongoose');

const config = require('../app/config/env');
const server = require('../server.js');

describe('Database reset', function(done) {
    it('should reset database', function(done) {

        this.timeout(10000);

        mongoose.connection.on("error", function(err) {
            console.log("Could not connect to mongo server!", err);

            throw err;
        });

        mongoose.connection.on("connected", function(ref) {
            console.log("Connected to mongo server.");

            mongoose.connection.db.dropDatabase(function (err) {
                if(err){
                    console.log(err);
                    throw err;
                }else{
                    done();
                }
            });
        });

        mongoose.connect(config.db, { useMongoClient: true });
    });
});

describe('Test server working', function(done) {
    it('should get a server message', function(done) {
        chai.request(server)
            .get('/')
            .end(function(err, res){
                expect(res.status).to.eql(200);
                done();
            });
    });
});

describe('Test API working', function(done) {
    it('should GET a API message', function(done) {
        chai.request(server)
            .get('/api')
            .end(function(err, res){
                expect(res.status).to.eql(200);
                done();
            });
    });
});

describe('Test Auth', function(done) {
    it('should register', function(done) {
        chai.request(server)
            .post('/api/auth/register')
            .send({ email: 'admin@teste.com', password: '123456' })
            .end(function(err, res){
                expect(res.status).to.eql(200);
                done();
            });
    });

    it('should login', function(done) {
        chai.request(server)
            .post('/api/auth/login')
            .send({ email: 'admin@teste.com', password: '123456' })
            .end(function(err, res){
                expect(res.status).to.eql(200);
                done();
            });
    });
});