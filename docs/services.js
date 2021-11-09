const { NotFound404, BadRequest400 } = require("./errorSchemas");

const ServicesTag = "Services";

const ServiceSchema = (showId) => {
  const properties = {
    _id: {
      $ref: "#/components/schemas/MongoId",
    },
    name: {
      type: "string",
      required: true,
      example: "Service1",
    },
    subServices: {
      type: "array",
      items: {
        $ref: "#/components/schemas/SubService",
      },
    },
  };

  if (!showId) {
    delete properties._id;
  }
  return {
    type: "object",
    properties,
  };
};

const idParameter = {
  name: "id",
  in: "path",
  required: true,
  description: "id of a service",
  schema: {
    $ref: "#/components/schemas/MongoId",
  },
};

const GetMethod = {
  tags: [ServicesTag],
  summary: "Get all services",
  operationId: "getServices",
  responses: {
    200: {
      description: "Services were obtained",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              status: {
                type: "string",
                example: "success",
              },
              results: {
                type: "number",
                description: "Number of elements in services array",
                example: 1,
              },
              data: {
                type: "object",
                properties: {
                  services: {
                    type: "array",
                    items: {
                      $ref: "#/components/schemas/Service",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    404: NotFound404,
  },
};

const GetFromIdMethod = {
  tags: [ServicesTag],
  summary: "Get service from id",
  operationId: "getServiceFromId",
  parameters: [idParameter],
  responses: {
    200: {
      description: "Service was obtained",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              status: {
                type: "string",
                example: "success",
              },
              data: {
                type: "object",
                properties: {
                  service: {
                    $ref: "#/components/schemas/Service",
                  },
                },
              },
            },
          },
        },
      },
    },
    404: NotFound404,
  },
};

const PostMethod = {
  tags: [ServicesTag],
  summary: "Create new Service",
  operationId: "postServices",
  requestBody: {
    content: { "application/json": { schema: ServiceSchema(false) } },
  },
  responses: {
    201: {
      description: "Service was created",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              status: {
                type: "string",
                example: "success",
              },
              data: {
                type: "object",
                properties: {
                  service: {
                    $ref: "#/components/schemas/Service",
                  },
                },
              },
            },
          },
        },
      },
    },
    400: BadRequest400,
  },
};

const UpdateMethod = {
  tags: [ServicesTag],
  summary: "Update a service",
  operationId: "updateService",
  parameters: [idParameter],
  requestBody: {
    required: true,
    content: { "application/json": { schema: ServiceSchema(false) } },
  },
  responses: {
    200: {
      description: "Service was updated",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              status: {
                type: "string",
                example: "success",
              },
              data: {
                type: "object",
                properties: {
                  service: {
                    $ref: "#/components/schemas/Service",
                  },
                },
              },
            },
          },
        },
      },
    },
    400: BadRequest400,
  },
};

const DeleteMethod = {
  tags: [ServicesTag],
  summary: "Delete service",
  operationId: "deleteService",
  parameters: [
    {
      name: "id",
      in: "path",
      required: true,
      description: "id of a service",
      schema: {
        $ref: "#/components/schemas/MongoId",
      },
    },
  ],
  responses: {
    204: {
      description: "Service was deleted",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              status: {
                type: "string",
                example: "success",
              },
              data: {
                type: "null",
                example: "null",
              },
            },
          },
        },
      },
    },
    400: BadRequest400,
  },
};

const ServicesMethods = {
  get: GetMethod,
  post: PostMethod,
};

const ServicesIdMethods = {
  get: GetFromIdMethod,
  patch: UpdateMethod,
  delete: DeleteMethod,
};

exports.ServicesPaths = {
  "/services": ServicesMethods,
  "/services/{id}": ServicesIdMethods,
};

/**
 * @param {boolean} showId Pass true if id needs to be shown
 */
exports.ServiceSchema = ServiceSchema;

exports.SubServicesSchema = {
  type: "object",
  properties: {
    name: {
      type: "string",
      example: "SubService1",
    },
  },
};
