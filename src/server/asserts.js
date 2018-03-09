const {eachIsUnique} = require(`../utils`);

const VALIDATION_ERROR = {
  error: `Validation Error`,
};

const combineAsserts = (...fns) =>
  (field, value) =>
    fns.reduce((errors, fn) =>
      errors.concat(fn(field, value)), []);

const checkEveryTextLength = (min, max) =>
  (field, value) => {
    const inRange = (item) =>
      (item.length >= min && item.length <= max);

    if (!value || value.split(` `).every(inRange)) {
      return null;
    }

    return {
      ...VALIDATION_ERROR,
      field,
      errorMessage: `contains words not in range from ${min} to ${max} symbols`,
    };
  };

const checkEveryWordIsUnique = (field, value) => {
  if (!value || eachIsUnique(value.split(` `))) {
    return null;
  }

  return {
    ...VALIDATION_ERROR,
    field,
    errorMessage: `contains not unique items`,
  };
};

const checkEveryWordStartsWith =
  (symbol) =>
    (field, value) => {
      const startsWithSymbol = (str) =>
        str[0] === symbol;


      if (!value || value.split(` `).every(startsWithSymbol)) {
        return null;
      }

      return {
        ...VALIDATION_ERROR,
        field,
        errorMessage: `contains words that starts w/ no ${symbol}`,
      };
    };

const checkGreaterThanOrEqual = (limit) =>
  (field, value) => {
    if (!value || (value >= limit)) {
      return null;
    }

    return {
      ...VALIDATION_ERROR,
      field,
      errorMessage: `is less than min value ${limit}`,
    };
  };

const checkImage =
  (field, value) => {
    if (!value || value.mimetype.startsWith(`image`)) {
      return null;
    }

    return {
      ...VALIDATION_ERROR,
      field,
      errorMessage: `is not an image`,
    };
  };

const checkInRange = (min, max) =>
  (field, value) => {
    if (!value || (value >= min && value <= max)) {
      return null;
    }

    if (Number.isInteger(Number(value))) {
      return {
        ...VALIDATION_ERROR,
        field,
        errorMessage: `is not in range from ${min} to ${max}`,
      };
    }

    return null;
  };

const checkInteger = (field, value) => {
  if (!value || Number.isInteger(Number(value))) {
    return null;
  }

  return {
    ...VALIDATION_ERROR,
    field,
    errorMessage: `is not integer`,
  };
};

const checkLessThanOrEqual = (limit) =>
  (field, value) => {
    if (!value || (value <= limit)) {
      return null;
    }

    return {
      ...VALIDATION_ERROR,
      field,
      errorMessage: `is greater than max value ${limit}`,
    };
  };

const checkMaxWords = (limit) =>
  (field, value) => {
    if (!value || (value.split(` `).length <= limit)) {
      return null;
    }

    return {
      ...VALIDATION_ERROR,
      field,
      errorMessage: `contains more than ${limit} words`,
    };
  };

const checkOneOf = (values) =>
  (field, value) => {
    if (!value || values.includes(value)) {
      return null;
    }

    return {
      ...VALIDATION_ERROR,
      field,
      errorMessage: `is not one of defined values (${values.join(`, `)})`,
    };
  };

const checkTextLength = (min, max) =>
  (field, value) => {
    if (!value || (value.length >= min && value.length <= max)) {
      return null;
    }

    return {
      ...VALIDATION_ERROR,
      field,
      errorMessage: `is not in range from ${min} to ${max} symbols`,
    };
  };

module.exports = {
  combineAsserts,
  checkEveryTextLength,
  checkEveryWordIsUnique,
  checkEveryWordStartsWith,
  checkGreaterThanOrEqual,
  checkImage,
  checkInRange,
  checkInteger,
  checkLessThanOrEqual,
  checkOneOf,
  checkMaxWords,
  checkTextLength,
  VALIDATION_ERROR,
};
