const {VALIDATION_ERROR} = require(`./asserts.js`);

const tryAsserts = (value, field, fieldScheme) => {
  if (fieldScheme.required && !value) {
    return [{
      ...VALIDATION_ERROR,
      field,
      errorMessage: `is required`,
    }];
  }

  return fieldScheme.asserts
      .map((fn) => fn(field, value));
};


const validate = (data) => ({
  use(scheme) {
    return Object.keys(scheme)
        .reduce((errors, fieldName) => {
          const result = tryAsserts(data[fieldName], fieldName, scheme[fieldName])
              .filter((value) => value);

          return errors.concat(result);
        }, []);
  }
});

module.exports = validate;
