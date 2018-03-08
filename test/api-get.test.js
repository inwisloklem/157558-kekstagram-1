/*
const request = require(`supertest`);

const {app} = require(`../src/server.js`);
const {byDate} = require(`../src/utils.js`);

const DB_MOCK = require(`../src/mock.js`);
const Errors = require(`../src/errors.js`);

describe(`GET /api/posts`, () => {
  it(`should respond w/ same JSON data as in mock file (limit: 15)`, () => {
    return request(app)
        .get(`/api/posts?limit=15`)
        .expect(`Content-Type`, /json/)
        .expect(200, DB_MOCK.slice(0, 15));
  });

  it(`should respond w/ same JSON data as in mock file (skip: 5)`, () => {
    return request(app)
        .get(`/api/posts?skip=5`)
        .expect(`Content-Type`, /json/)
        .expect(200, DB_MOCK.slice(5, 55));
  });

  it(`should respond w/ correct amount of data (skip: 3, limit: 2)`, () => {
    return request(app)
        .get(`/api/posts?skip=3&limit=2`)
        .expect(`Content-Type`, /json/)
        .expect(200, DB_MOCK.slice(3, 5));
  });

  it(`should respond w/ 400 Bad Request in case of bad query parameters`, () => {
    return request(app)
        .get(`/api/posts?limit=not&skip=valid`)
        .expect(`Content-Type`, /json/)
        .expect(400, [Errors.BAD_REQUEST]);
  });
});

describe(`GET /api/posts/:date`, () => {
  /*
  it(`should respond w/ same data in JSON as in mock file by date`, () => {
    const VALID_DATE = 1519736965943;

    return request(app)
        .get(`/api/posts/${VALID_DATE}`)
        .expect(`Content-Type`, /json/)
        .expect(200, DB_MOCK.find(byDate(VALID_DATE)));
  });

  it(`should respond w/ 404 Not Found if data not found by date`, () => {
    const INVALID_DATE = 666;

    return request(app)
        .get(`/api/posts/${INVALID_DATE}`)
        .expect(`Content-Type`, /json/)
        .expect(404, [Errors.NOT_FOUND]);
  });
});
*/
