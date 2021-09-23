'use strict';
var chai = require('chai');
var ZSchema = require('z-schema');
var customFormats = module.exports = function(zSchema) {
  // Placeholder file for all custom-formats in known to swagger.json
  // as found on
  // https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#dataTypeFormat

  var decimalPattern = /^\d{0,8}.?\d{0,4}[0]+$/;

  /** Validates floating point as decimal / money (i.e: 12345678.123400..) */
  zSchema.registerFormat('double', function(val) {
    return !decimalPattern.test(val.toString());
  });

  /** Validates value is a 32bit integer */
  zSchema.registerFormat('int32', function(val) {
    // the 32bit shift (>>) truncates any bits beyond max of 32
    return Number.isInteger(val) && ((val >> 0) === val);
  });

  zSchema.registerFormat('int64', function(val) {
    return Number.isInteger(val);
  });

  zSchema.registerFormat('float', function(val) {
    // should parse
    return Number.isInteger(val);
  });

  zSchema.registerFormat('date', function(val) {
    // should parse a a date
    return !isNaN(Date.parse(val));
  });

  zSchema.registerFormat('dateTime', function(val) {
    return !isNaN(Date.parse(val));
  });

  zSchema.registerFormat('password', function(val) {
    // should parse as a string
    return typeof val === 'string';
  });
};

customFormats(ZSchema);

var validator = new ZSchema({});
var supertest = require('supertest');
var conn = process.env.conn || "http://192.168.99.101";
var api = supertest(conn); // supertest init;
var api_key = '';

before(function(done){
  api.post('/loginapi')
  .set('Content-Type', 'application/json')
  .set({    
    'Accept' : 'application/json'
  })
  .send({
    username: "test",
    password: "test"
  })
  .end(function(err, res) {
    done();
    api_key = res.body.apikey;
  });

});

chai.should();

describe('/dataNodeDag', function() {
  describe('post', function() {
    it('should respond with 200 The information you just...', function(done) {
      /*eslint-disable*/
      var schema = {
        "type": "object",
        "properties": {
          "tipo": {
            "type": "string",
            "description": "Type of info, err, log or out"
          },
          "info": {
            "type": "string",
            "description": "the info"
          }
        }
      };

      /*eslint-enable*/
      api.post('/dataNodeDag')
      .set('Content-Type', 'application/json')
      .set({
        'apikey': api_key,
        'Accept' : 'application/json'
      })
      .send({
        body: 'DATA GOES HERE'
      })
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);

        validator.validate(res.body, schema).should.be.true;
        done();
      });
    });

    it('should respond with default Unexpected error', function(done) {
      /*eslint-disable*/
      var schema = {
        "type": "object",
        "properties": {
          "code": {
            "type": "integer",
            "format": "int32"
          },
          "message": {
            "type": "string"
          },
          "fields": {
            "type": "string"
          }
        }
      };

      /*eslint-enable*/
      api.post('/dataNodeDag')
      .set('Content-Type', 'application/json')
      .set({
        'apikey': api_key
      })
      .send({
        'apikey': api_key,
        'Accept' : 'application/json'
      })
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);

        validator.validate(res.body, schema).should.be.true;
        done();
      });
    });

  });

});
