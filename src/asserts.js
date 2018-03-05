const {eachIsUnique} = require(`./utils.js`);

const VALIDATION_ERROR = {
  error: `Validation Error`,
};

const everyTextInRange = (min, max) =>
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

const greaterThanEqual = (limit) =>
  (field, value) => {
    if (!value || (value >= limit)) {
      return null;
    }

    if (Number.isInteger(Number(value))) {
      return {
        ...VALIDATION_ERROR,
        field,
        errorMessage: `is less than min value ${limit}`,
      };
    }

    return null;
  };

const image =
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

const inRange = (min, max) =>
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

const integer = (field, value) => {
  if (!value || Number.isInteger(Number(value))) {
    return null;
  }

  return {
    ...VALIDATION_ERROR,
    field,
    errorMessage: `is not integer`,
  };
};

const lessThanEqual = (limit) =>
  (field, value) => {
    if (!value || (value <= limit)) {
      return null;
    }

    if (Number.isInteger(Number(value))) {
      return {
        ...VALIDATION_ERROR,
        field,
        errorMessage: `is greater than max value ${limit}`,
      };
    }

    return null;
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

const oneOf = (values) =>
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

const required = (field, value) => {
  if (value) {
    return null;
  }

  return {
    ...VALIDATION_ERROR,
    field,
    errorMessage: `is required`,
  };
};

const textInRange = (min, max) =>
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

module.exports = {
  everyTextInRange,
  everyWordIsUnique,
  everyWordStartsWith,
  greaterThanEqual,
  image,
  inRange,
  integer,
  lessThanEqual,
  maxWords,
  oneOf,
  required,
  textInRange,
  VALIDATION_ERROR,
};
