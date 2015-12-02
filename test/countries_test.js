var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;

process.env.MONGOLAB_URI = 'mongodb://localhost/country_stream_test';
require(__dirname + '/../server');
var mongoose = require('mongoose');
var Country = require(__dirname + '/../models/country');

describe('country routes', function() {
  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  it('should be able to create a country', function(done) {
    var countryData = {name: 'test'};
    chai.request('localhost:3000')
      .post('/api/countries')
      .send(countryData)
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body).to.have.property('_id');
        done();
      });
  });

  it('should be able to get all countries', function(done) {
    chai.request('localhost:3000')
      .get('/api/countries')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(Array.isArray(res.body)).to.eql(true);
        done();
      });
  });

  describe('needs a country', function() {
    beforeEach(function(done) {
      (new Country({name: 'test'})).save(function(err, data) {
        expect(err).to.eql(null);
        this.country = data;
        done();
      }.bind(this));
    });

    it('should be able to update a country', function(done) {
      chai.request('localhost:3000')
        .put('/api/countries/' + this.country._id)
        .send({name: 'a different country name'})
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body.msg).to.eql('success!');
          done();
        });
    });

    it('should be able to remove a country', function(done) {
      chai.request('localhost:3000')
        .delete('/api/countries/' + this.country._id)
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body.msg).to.eql('success!');
          done();
        });
    });
  });
});
