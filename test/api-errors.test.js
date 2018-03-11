const request = require(`supertest`);

const app = require(`express`)();

const Errors = require(`../src/server/errors`);

const mockImageStore = require(`./mock/mock-image-store`);

const mockRouter = require(`../src/server/post-routes`);

const mockPostStore = {
  getAllPosts() {
    throw new Error();
  }
};

app.use(`/api/posts`, mockRouter(mockPostStore, mockImageStore));

describe(`GET /api/posts (w/ broken store method)`, () => {
  it(`should respond w/ 500 Internal Server Error`, () => {
    return request(app)
        .get(`/api/posts/`)
        .expect(`Content-Type`, /json/)
        .expect(500, [Errors.INTERNAL_SERVER_ERROR]);
  });
});

describe(`DELETE /api/posts`, () => {
  it(`should respond w/ 501 Not Implemented`, () => {
    return request(app)
        .delete(`/api/posts/`)
        .expect(`Content-Type`, /json/)
        .expect(501, [Errors.NOT_IMPLEMENTED]);
  });
});
