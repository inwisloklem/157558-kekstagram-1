const request = require(`supertest`);

const app = require(`express`)();

const mockPostStore = require(`./mock/mock-post-store`);
const mockImageStore = require(`./mock/mock-image-store`);

const mockRouter = require(`../src/server/post-routes`);

app.use(`/api/posts`, mockRouter(mockPostStore, mockImageStore));

describe(`POST api/posts`, () => {
  it(`should accept valid multipart/form-data`, () => {
    return request(app)
        .post(`/api/posts`)
        .field(`date`, `1520589389481`)
        .field(`description`, `Wonderful depth and focus!`)
        .field(`effect`, `none`)
        .field(`hashtags`, `#pleasure #breakfast`)
        .field(`likes`, 650)
        .field(`scale`, 87)
        .attach(`filename`, `./test/fixtures/image.png`)
        .expect(200, {
          date: 1520589389481,
          description: `Wonderful depth and focus!`,
          effect: `none`,
          filename: {
            path: `/photos/1520589389481`,
            mimetype: `image/png`
          },
          hashtags: `#pleasure #breakfast`,
          likes: 650,
          scale: 87,
          url: `/api/posts/1520589389481/image`,
        });
  });

  it(`should validate data (test case 1)`, () => {
    const INVALID_DATA = {
      date: `-666`,
      description: `Fantastic view! Fantastic view! Fantastic view! Fantastic view! Fantastic view! Fantastic view! Fantastic view! Fantastic view! Fantastic view! Fantastic view! Fantastic view! Fantastic view! Fantastic view!`,
      effect: `horrible`,
      hashtags: `#academy #food #academy #breakfastbreakfastbreakfastbreakfastbreakfast #pleasure #food #academy`,
      scale: 1488,
    };

    const EXPECTED_ERRORS = [
      {
        error: `Validation Error`,
        field: `date`,
        errorMessage: `is less than min value 0`,
      },
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
        field: `date`,
        errorMessage: `is required`,
      },
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
