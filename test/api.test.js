const request = require(`supertest`);
const assert = require(`assert`);

const {app} = require(`../src/server.js`);
const {byDate} = require(`../src/utils.js`);

const DB_MOCK = require(`../src/mock.js`);
const ERRORS = require(`../src/errors.js`);

describe(`GET /api/posts`, () => {
  it(`should respond w/ same JSON data as in mock file (limit: 15)`, () => {
    return request(app)
        .get(`/api/posts?limit=15`)
        .expect(200)
        .expect(`Content-Type`, /json/)
        .then((response) => {
          assert.deepEqual(response.body, DB_MOCK.slice(0, 15));
        });
  });

  it(`should respond w/ same JSON data as in mock file (skip: 5)`, () => {
    return request(app)
        .get(`/api/posts?skip=5`)
        .expect(200)
        .expect(`Content-Type`, /json/)
        .then((response) => {
          console.log(response.body);
          assert.deepEqual(response.body, DB_MOCK.slice(5, 55));
        });
  });

  it(`should respond w/ correct amount of data (skip: 3, limit: 2)`, () => {
    return request(app)
        .get(`/api/posts?skip=3&limit=2`)
        .expect(200)
        .expect(`Content-Type`, /json/)
        .then((response) => {
          assert.deepEqual(response.body, DB_MOCK.slice(3, 5));
        });
  });

  it(`should respond w/ 400 Bad Request in case of bad query parameters`, () => {
    return request(app)
        .get(`/api/posts?limit=wtf`)
        .expect(400)
        .expect(`Content-Type`, /json/)
        .then((response) => {
          assert.deepEqual(response.body, [ERRORS.BAD_REQUEST]);
        });
  });
});

describe(`GET /api/posts/:date`, () => {
  it(`should respond w/ same data in JSON as in mock file by date`, () => {
    const DATE = 1519736965943;

    return request(app)
        .get(`/api/posts/${DATE}`)
        .expect(200)
        .expect(`Content-Type`, /json/)
        .then((response) => {
          assert.deepEqual(response.body, DB_MOCK.find(byDate(DATE)));
        });
  });
});

describe(`POST api/posts`, () => {
  it(`should accept multipart/form-data`, () => {
    return request(app)
        .post(`/api/posts`)
        .field(`key`, `value`)
        .field(`key2`, `value2`)
        .expect(200)
        .then((response) => {
          assert.equal(response.body.key, `value`);
          assert.equal(response.body.key2, `value2`);
        });
  });

  it(`should accept JSON`, () => {
    return request(app)
        .post(`/api/posts`)
        .send(DB_MOCK[0])
        .expect(200)
        .expect(`Content-Type`, /json/)
        .then((response) => {
          assert.deepEqual(response.body, DB_MOCK[0]);
        });
  });
});

describe(`DELETE /api/posts`, () => {
  it(`should respond w/ 501 Not Implemented`, () => {
    return request(app)
        .delete(`/api/posts/`)
        .expect(501)
        .expect(`Content-Type`, /json/)
        .then((response) => {
          assert.deepEqual(response.body, [ERRORS.NOT_IMPLEMENTED]);
        });
  });
});
