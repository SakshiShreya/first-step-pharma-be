const { Schemas } = require("./schemas");
const { ServicesMethods } = require("./services");

module.exports = {
  openapi: "3.0.1",
  info: {
    version: "1.3.0",
    title: "Services",
    description: "Services API",
    contact: {
      name: "Sakshi Shreya",
      email: "shreyasakshi96@gmail.com",
      url: "https://sakshishreya.github.io",
    },
  },
  servers: [
    { url: "http://localhost:8000/api/v1", description: "Local server" },
  ],
  paths: {
    "/services": ServicesMethods,
  },
  components: {
    schemas: Schemas,
  },
};
