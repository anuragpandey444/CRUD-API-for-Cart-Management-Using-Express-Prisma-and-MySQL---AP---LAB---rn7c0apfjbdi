const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');

chai.use(chaiHttp);
const expect = chai.expect;

const API_AUTH_KEY = '8a60348b-d4a4-564a-9b45-aab518adb7f4';

describe('Cart API', () => {
  describe('Authentication', () => {
    it('should return 403 when apiauthkey is missing', (done) => {
      chai.request(app)
        .get('/api/cart/getById/1')
        .end((err, res) => {
          expect(res).to.have.status(403);
          expect(res.body).to.have.property('error', 'apiauthkey is missing or invalid');
          done();
        });
    });

    it('should return 403 when apiauthkey is invalid', (done) => {
      chai.request(app)
        .get('/api/cart/getById/1')
        .set('apiauthkey', 'invalid-key')
        .end((err, res) => {
          expect(res).to.have.status(403);
          expect(res.body).to.have.property('error', 'Failed to authenticate apiauthkey');
          done();
        });
    });
  });

  describe('POST /api/cart/addProduct', () => {
    it('should return 404 when required fields are missing', (done) => {
      chai.request(app)
        .post('/api/cart/addProduct')
        .set('apiauthkey', API_AUTH_KEY)
        .send({ userId: 2 })
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('error', 'All fields required');
          done();
        });
    });
  });

  describe('GET /api/cart/getById/:id', () => {
    it('should return 404 for invalid cart ID', (done) => {
      chai.request(app)
        .get('/api/cart/getById/999009090909090')
        .set('apiauthkey', API_AUTH_KEY)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('error', 'Cart not found');
          done();
        });
    });
  });
});