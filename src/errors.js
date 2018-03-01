const ERRORS = {
  BAD_REQUEST: {
    error: `400 Bad Request`,
    errorMessage: `Server could not understand the request due to invalid query params.`,
  },
  NOT_FOUND: {
    error: `404 Not Found`,
    errorMessage: `Server cannot find requested resource.`,
  },
  NOT_IMPLEMENTED: {
    error: `501 Not Implemented`,
    errorMessage: `Request method is not supported by the server and cannot be handled.`,
  }
};

module.exports = ERRORS;
