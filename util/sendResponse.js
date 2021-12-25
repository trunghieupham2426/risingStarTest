function sendResponseErr(statusCode, status, message, res) {
  res.status(statusCode).json({
    status: status,
    message: message,
  });
}
function sendResponse(statusCode, status, data, res) {
  res.status(statusCode).json({
    status: status,
    data: data,
  });
}

module.exports = {
  sendResponseErr: sendResponseErr,
  sendResponse: sendResponse,
};
