const request = require(`supertest`);

const app = require(`express`)();

const MOCK_DB = require(`./mock/mock-database`);
const Errors = require(`../src/server/errors`);

const {byDate} = require(`../src/utils`);

const mockPostStore = require(`./mock/mock-post-store`);
const mockImageStore = require(`./mock/mock-image-store`);

const mockRouter = require(`../src/server/post-routes`)(mockPostStore, mockImageStore);

app.use(`/api/posts`, mockRouter);

describe(`GET /api/posts`, () => {
  it(`should respond w/ same JSON data as in mock file (limit: 15)`, () => {
    return request(app)
        .get(`/api/posts?limit=15`)
        .expect(`Content-Type`, /json/)
        .expect(200, MOCK_DB.slice(0, 15));
  });

  it(`should respond w/ correct amount of data (skip: 3, limit: 2)`, () => {
    return request(app)
        .get(`/api/posts?skip=3&limit=2`)
        .expect(`Content-Type`, /json/)
        .expect(200, MOCK_DB.slice(3, 5));
  });

  it(`should respond w/ 400 Bad Request in case of bad query parameters`, () => {
    return request(app)
        .get(`/api/posts?limit=not&skip=valid`)
        .expect(`Content-Type`, /json/)
        .expect(400, [Errors.BAD_REQUEST]);
  });
});

describe(`GET /api/posts/:date`, () => {
  it(`should respond w/ same data in JSON as in mock file by date`, () => {
    const VALID_DATE = 1520265998533;

    return request(app)
        .get(`/api/posts/${VALID_DATE}`)
        .expect(`Content-Type`, /json/)
        .expect(200, MOCK_DB.find(byDate(VALID_DATE)));
  });

  it(`should respond w/ 404 Not Found if data not found by date`, () => {
    const INVALID_DATE = 666;

    return request(app)
        .get(`/api/posts/${INVALID_DATE}`)
        .expect(`Content-Type`, /json/)
        .expect(404, [Errors.NOT_FOUND]);
  });
});
