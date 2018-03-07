const {VALIDATION_ERROR} = require(`./asserts.js`);

const tryAsserts = (value, field, fieldScheme) => {
  if (fieldScheme.required && !value) {
    return [{
      ...VALIDATION_ERROR,
      field,
      errorMessage: `is required`,
    }];
  }

  for (const fn of fieldScheme.asserts) {
    const error = fn(field, value);

    if (error) {
      return Array.isArray(error) ? error : [error];
    }
  }

  return [];
};

const validate = (data, scheme) =>
  Object.keys(scheme)
      .reduce((errors, fieldName) => {
        const result = tryAsserts(data[fieldName], fieldName, scheme[fieldName])
            .filter((value) => value);

        return errors.concat(result);
      }, []);

module.exports = validate;
