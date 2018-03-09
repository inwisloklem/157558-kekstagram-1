const request = require(`supertest`);

const app = require(`express`)();

const Errors = require(`../src/server/errors`);

const mockPostStore = require(`./mock/mock-post-store`);
const mockImageStore = require(`./mock/mock-image-store`);

const mockRouter = require(`../src/server/post-routes`)(mockPostStore, mockImageStore);

app.use(`/api/posts`, mockRouter);

describe(`DELETE /api/posts`, () => {
  it(`should respond w/ 501 Not Implemented`, () => {
    return request(app)
        .delete(`/api/posts/`)
        .expect(`Content-Type`, /json/)
        .expect(501, [Errors.NOT_IMPLEMENTED]);
  });
});
