const { AboutMePaths } = require("./aboutMe");
const { Schemas } = require("./schemas");
const { ServicesPaths } = require("./services");

module.exports = {
  openapi: "3.0.1",
  info: {
    version: "1.3.0",
    title: "First Step",
    description: "List of all apis used in first step pharma",
    contact: {
      name: "Sakshi Shreya",
      email: "shreyasakshi96@gmail.com",
      url: "https://sakshishreya.github.io",
    },
  },
  servers: [
    { url: "http://localhost:8000/api/v1", description: "Local server" },
    {
      url: "https://first-step-pharma.herokuapp.com/api/v1",
      description: "Heroku Prod",
    },
  ],
  paths: {
    ...ServicesPaths,
    ...AboutMePaths,
  },
  components: {
    schemas: Schemas,
  },
};
