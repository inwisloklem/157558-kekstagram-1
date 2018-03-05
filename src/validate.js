const tryAsserts = (field, value, asserts) =>
  asserts
      .map((fn) => fn(field, value));

const validate = (data) => ({
  with(scheme) {
    let errors = [];
    for (const fieldName in scheme) {
      if (scheme.hasOwnProperty(fieldName)) {
        const result = tryAsserts(fieldName, data[fieldName], scheme[fieldName])
            .filter((value) => value);

        errors = errors
            .concat(result);
      }
    }

    return errors;
  }
});

module.exports = validate;
