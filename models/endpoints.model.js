const fs = require("fs/promises");

module.exports.fetchAvailableEndpoints = () => {
    return fs
      .readFile("./endpoints.json", "utf-8")
        .then((data) => {
           const endpoints =  JSON.parse(data);
            return endpoints;
        })
};
