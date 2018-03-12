process.env.NODE_ENV = `test`;

const request = require(`supertest`);

const app = require(`express`)();

const assert = require(`assert`);

const mockPostStore = require(`./mock/mock-post-store`);
const mockImageStore = require(`./mock/mock-image-store`);

const mockRouter = require(`../src/server/post-routes`);

app.use(`/api/posts`, mockRouter(mockPostStore, mockImageStore));

describe(`POST api/posts`, () => {
  it(`should accept valid multipart/form-data`, () => {
    return request(app)
        .post(`/api/posts`)
        .field(`description`, `Wonderful depth and focus!`)
        .field(`effect`, `none`)
        .field(`hashtags`, `#pleasure #breakfast`)
        .field(`likes`, 650)
        .field(`scale`, 87)
        .attach(`filename`, `./test/fixtures/image.png`)
        .expect(200)
        .then((response) => {
          const data = response.body;

          assert(/\d+/.test(data.date));
          assert.equal(data.description, `Wonderful depth and focus!`);
          assert.equal(data.effect, `none`);
          assert.equal(data.hashtags, `#pleasure #breakfast`);
          assert.equal(data.likes, 650);
          assert.equal(data.scale, 87);
          assert.equal(data.filename.mimetype, `image/png`);

          assert(/photos\/\d+/.test(data.filename.path));
          assert(/api\/posts\/\d+\/image/.test(data.url));
        });
  });

  it(`should validate data (test case 1)`, () => {
    const INVALID_DATA = {
      description: `Fantastic view! Fantastic view! Fantastic view! Fantastic view! Fantastic view! Fantastic view! Fantastic view! Fantastic view! Fantastic view! Fantastic view! Fantastic view! Fantastic view! Fantastic view!`,
      effect: `horrible`,
      hashtags: `#academy #food #academy #breakfastbreakfastbreakfastbreakfastbreakfast #pleasure #food #academy`,
      scale: 1488,
    };

    const EXPECTED_ERRORS = [
      {
        error: `Validation Error`,
        field: `description`,
        errorMessage: `is not in range from 0 to 140 symbols`,
      },
      {
        error: `Validation Error`,
        field: `effect`,
        errorMessage: `is not one of defined values (none, chrome, sepia, marvin, phobos, heat)`,
      },
      {
        error: `Validation Error`,
        field: `filename`,
        errorMessage: `is required`,
      },
      {
        error: `Validation Error`,
        field: `hashtags`,
        errorMessage: `contains words not in range from 0 to 20 symbols`,
      },
      {
        error: `Validation Error`,
        field: `hashtags`,
        errorMessage: `contains not unique items`,
      },
      {
        error: `Validation Error`,
        field: `hashtags`,
        errorMessage: `contains more than 5 words`,
      },
      {
        error: `Validation Error`,
        field: `scale`,
        errorMessage: `is not in range from 0 to 100`,
      }
    ];

    return request(app)
        .post(`/api/posts`)
        .send(INVALID_DATA)
        .expect(400, EXPECTED_ERRORS);
  });

  it(`should validate data (test case 2)`, () => {
    const INVALID_DATA = {
      filename: {
        mimetype: `audio/mp4`
      },
      hashtags: `academy #food #zen breakfast #pleasure`,
    };

    const EXPECTED_ERRORS = [
      {
        error: `Validation Error`,
        field: `effect`,
        errorMessage: `is required`,
      },
      {
        error: `Validation Error`,
        field: `filename`,
        errorMessage: `is not an image`,
      },
      {
        error: `Validation Error`,
        field: `hashtags`,
        errorMessage: `contains words that starts w/ no #`,
      },
      {
        error: `Validation Error`,
        field: `scale`,
        errorMessage: `is required`,
      }
    ];

    return request(app)
        .post(`/api/posts`)
        .send(INVALID_DATA)
        .expect(400, EXPECTED_ERRORS);
  });
});
