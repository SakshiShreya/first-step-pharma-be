const { SubServicesSchema, ServiceSchema } = require("./services");

const ErrorSchema = {
  type: "object",
  properties: {
    message: {
      type: "string",
    },
    status: {
      type: "string",
    },
  },
};

exports.Schemas = {
  SubService: SubServicesSchema,
  Service: ServiceSchema,
  Error: ErrorSchema,
};
