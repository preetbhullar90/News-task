const { fetchAvailableEndpoints } = require("../models/endpoints.model");


module.exports.availableEndpoints = (req, res, next) => {
  fetchAvailableEndpoints()
    .then((endpoints) => {
      res.status(200).send({ endpoints });
    })
    .catch((err) => {
      next(err);
    });
};