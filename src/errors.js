const Errors = {
  BAD_REQUEST: {
    error: `Bad Request`,
    errorMessage: `Server could not understand the request due to invalid query params.`,
  },
  NOT_FOUND: {
    error: `Not Found`,
    errorMessage: `Server cannot find requested resource.`,
  },
  NOT_IMPLEMENTED: {
    error: `Not Implemented`,
    errorMessage: `Request method is not supported by the server and cannot be handled.`,
  }
};

module.exports = Errors;
