/*
const request = require(`supertest`);

const {app} = require(`../src/server.js`);

const Errors = require(`../src/errors.js`);

describe(`DELETE /api/posts`, () => {
  it(`should respond w/ 501 Not Implemented`, () => {
    return request(app)
        .delete(`/api/posts/`)
        .expect(`Content-Type`, /json/)
        .expect(501, [Errors.NOT_IMPLEMENTED]);
  });
});
*/
