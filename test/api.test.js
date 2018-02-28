const request = require(`supertest`);
const assert = require(`assert`);

const {app} = require(`../src/server.js`);
const {byDate} = require(`../src/utils.js`);

const dbMock = [...require(`../src/mock.js`)];

// Если написать просто DB_MOCK = require(`../src/mock.js`)

describe(`GET /api/posts`, () => {
  it(`should respond w/ same data in JSON as in mock file`, () => {
    return request(app)
        .get(`/api/posts?&limit=15`)
        .expect(200)
        .expect(`Content-Type`, /json/)
        .then((response) => {

          // И поставить DB_MOCK сюда, то там не будет значений
          // console.log(DB_MOCK) тут будет выглядеть как [].
          // Почему так?

          assert.deepEqual(response.body, dbMock.slice(0, 15));
        });
  });

  it(`should respond w/ correct amount of data`, () => {
    return request(app)
        .get(`/api/posts?&limit=5`)
        .then((response) => {
          assert.equal(response.body.length, 5);
        });
  });

  it(`should respond w/ 400 in case of bad query parameters`, () => {
    return request(app)
        .get(`/api/posts?limit=wtf`)
        .expect(400);
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
          assert.deepEqual(response.body, dbMock.filter(byDate(DATE)));
        });
  });
});

describe(`POST api/posts`, () => {
  it(`accepts multipart/form-data`, () => {
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
});
