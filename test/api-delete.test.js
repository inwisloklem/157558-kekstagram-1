const request = require(`supertest`);

const app = require(`express`)();

const Errors = require(`../src/errors.js`);

const mockPostStore = require(`../src/mock-post-store.js`);
const mockImageStore = require(`../src/mock-image-store.js`);

const mockRouter = require(`../src/post-routes.js`)(mockPostStore, mockImageStore);

app.use(`/api/posts`, mockRouter);

describe(`DELETE /api/posts`, () => {
  it(`should respond w/ 501 Not Implemented`, () => {
    return request(app)
        .delete(`/api/posts/`)
        .expect(`Content-Type`, /json/)
        .expect(501, [Errors.NOT_IMPLEMENTED]);
  });
});
