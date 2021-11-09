const { ServicesTag } = require("./tags");

const GetMethod = {
  tags: [ServicesTag],
  summary: "Get all services",
  operationId: "getServcies",
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
    404: {
      description: "Error",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/Error",
          },
          example: {
            message: "Some String",
            status: "fail",
          },
        },
      },
    },
  },
};

const PostMethod = {
  tags: [ServicesTag],
  description: "Create a new service",
  operationId: "postServcies",
};

exports.ServicesMethods = {
  get: GetMethod,
  post: PostMethod,
};

exports.ServiceSchema = {
  type: "object",
  properties: {
    _id: {
      type: "integer",
      example: 1234,
    },
    name: {
      type: "string",
      example: "Service1",
    },
    subServices: {
      type: "array",
      items: {
        $ref: "#/components/schemas/SubService",
      },
    },
  },
};

exports.SubServicesSchema = {
  type: "object",
  properties: {
    name: {
      type: "string",
      example: "SubService1",
    },
  },
};
