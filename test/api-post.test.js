const request = require(`supertest`);

const {app} = require(`../src/server.js`);

describe(`POST api/posts`, () => {
  const VALID_DATA = {
    date: 1519736966666,
    description: `Fantastic view!`,
    effect: `marvin`,
    hashtags: `#academy #food #zen #breakfast #pleasure`,
    scale: 76,
  };

  it(`should accept valid multipart/form-data`, () => {
    return request(app)
        .post(`/api/posts`)
        .field(`date`, `1519736966666`)
        .field(`description`, `Fantastic view!`)
        .field(`effect`, `marvin`)
        .field(`hashtags`, `#academy #food #zen #breakfast #pleasure`)
        .field(`scale`, `76`)
        .expect(200, VALID_DATA);
  });

  it(`should accept valid JSON`, () => {
    return request(app).post(`/api/posts`)
        .send(VALID_DATA)
        .expect(200, VALID_DATA);
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
        errorMessage: `is less than min value 0`
      },
      {
        error: `Validation Error`,
        field: `description`,
        errorMessage: `is not in range from 0 to 140 symbols`
      },
      {
        error: `Validation Error`,
        field: `effect`,
        errorMessage: `is not one of defined values (none, chrome, sepia, marvin, phobos, heat)`
      },
      {
        error: `Validation Error`,
        field: `hashtags`,
        errorMessage: `contains words not in range from 0 to 20 symbols`
      },
      {
        error: `Validation Error`,
        field: `hashtags`,
        errorMessage: `contains not unique items`
      },
      {
        error: `Validation Error`,
        field: `hashtags`,
        errorMessage: `contains more than 5 words`
      },
      {
        error: `Validation Error`,
        field: `scale`,
        errorMessage: `is not in range from 0 to 100`
      }
    ];

    return request(app)
        .post(`/api/posts`)
        .send(INVALID_DATA)
        .expect(400, EXPECTED_ERRORS);
  });

  it(`should validate data (test case 2)`, () => {
    const INVALID_DATA = {
      hashtags: `academy #food #zen breakfast #pleasure`,
    };

    const EXPECTED_ERRORS = [
      {
        error: `Validation Error`,
        field: `date`,
        errorMessage: `is required`
      },
      {
        error: `Validation Error`,
        field: `effect`,
        errorMessage: `is required`
      },
      {
        error: `Validation Error`,
        field: `hashtags`,
        errorMessage: `contains words that starts w/ no #`},
      {
        error: `Validation Error`,
        field: `scale`,
        errorMessage: `is required`
      }
    ];

    return request(app)
        .post(`/api/posts`)
        .send(INVALID_DATA)
        .expect(400, EXPECTED_ERRORS);
  });
});
