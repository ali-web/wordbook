const supertest = require('supertest');
const chai = require('chai');
chai.should();
const expect = chai.expect;

process.env.IS_LOCALHOST = 'yes';
const app = require('../../app');

describe('/words Api tests', () => {
    it('GET /words should return an a', () => {
        return supertest(app)
        .get('/api/words')
        .expect(200)
        .then(res => {
            expect(res.body).to.be.an('array');
            console.log(res.body);
        });
    });   
});