const {eachIsUnique} = require(`./utils.js`);

const VALIDATION_ERROR = {
  error: `Validation Error`,
};

const everyTextLength = (min, max) =>
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

const everyWordIsUnique = (field, value) => {
  if (!value || eachIsUnique(value.split(` `))) {
    return null;
  }

  return {
    ...VALIDATION_ERROR,
    field,
    errorMessage: `contains not unique items`,
  };
};

const everyWordStartsWith =
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

const isGreaterThanOrEqual = (limit) =>
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

const isImage =
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

const isInRange = (min, max) =>
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

const isInteger = (field, value) => {
  if (!value || Number.isInteger(Number(value))) {
    return null;
  }

  return {
    ...VALIDATION_ERROR,
    field,
    errorMessage: `is not integer`,
  };
};

const isLessThanOrEqual = (limit) =>
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

const maxWords = (limit) =>
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

const isOneOf = (values) =>
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

const textLength = (min, max) =>
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
  everyTextLength,
  everyWordIsUnique,
  everyWordStartsWith,
  isGreaterThanOrEqual,
  isImage,
  isInRange,
  isInteger,
  isLessThanOrEqual,
  isOneOf,
  maxWords,
  textLength,
  VALIDATION_ERROR,
};
