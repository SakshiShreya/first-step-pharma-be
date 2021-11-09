const { ErrorSchema } = require("./errorSchemas");
const { SubServicesSchema, ServiceSchema } = require("./services");

const MongoIdSchema = {
  type: "string",
  example: "asdfrgt123456",
};

exports.Schemas = {
  SubService: SubServicesSchema,
  Service: ServiceSchema(true),
  MongoId: MongoIdSchema,
  Error: ErrorSchema,
};
