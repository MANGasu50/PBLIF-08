class Controller {
  static baseResponse(status, message, data) {
    return {
      message,
      data,
      status
    };
  }
}

module.exports = Controller;
