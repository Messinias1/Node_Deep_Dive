const log = (req, res, next) => {
  console.log("Logging...");
  next();
};

const authenticate = (req, res, next) => {
  console.log("Authenticating...");
  next();
};

module.exports = log;
