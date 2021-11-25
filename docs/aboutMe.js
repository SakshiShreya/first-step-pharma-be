const { NotFound404, BadRequest400 } = require("./errorSchemas");

const AboutMeTag = "AboutMe";

/**
 * @param {boolean} showId Pass true if id needs to be shown
 */
const AboutMeSchema = (showId) => {
  const properties = {
    _id: {
      $ref: "#/components/schemas/MongoId",
    },
    name: {
      type: "string",
      required: true,
      example: "My Name",
    },
    phone: {
      type: "String",
      required: true,
      example: "+91 9876543210",
    },
    address: {
      type: "array",
      items: {
        type: "string",
      },
      example: ["sdfgh", "dwfghj", "wesrty"],
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

const fieldsParameter = {
  name: "fields",
  in: "query",
  required: false,
  description: "comma separated string of all fields to get",
  schema: {
    type: "string",
    example: "name,phone",
  },
};

const GetMethod = {
  tags: [AboutMeTag],
  summary: "Get about me",
  operationId: "getAboutMe",
  parameters: [fieldsParameter],
  responses: {
    200: {
      description: "About was obtained",
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
                  aboutMe: {
                    $ref: "#/components/schemas/AboutMe",
                  },
                },
              },
            },
          },
        },
      },
    },
    404: NotFound404("About not found"),
  },
};

const UpdateMethod = {
  tags: [AboutMeTag],
  summary: "Update a field in about",
  operationId: "updateAbout",
  requestBody: {
    required: true,
    content: { "application/json": { schema: AboutMeSchema(false) } },
  },
  responses: {
    200: {
      description: "Field(s) in about was/were updated",
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
                  aboutMe: {
                    $ref: "#/components/schemas/AboutMe",
                  },
                },
              },
            },
          },
        },
      },
    },
    404: NotFound404("About not found"),
    400: BadRequest400("Some validation failed"),
  },
};

const AboutMeMethods = {
  get: GetMethod,
  patch: UpdateMethod,
};

exports.AboutMePaths = {
  "/aboutme": AboutMeMethods,
};

exports.AboutMeSchema = AboutMeSchema;

exports.SubServicesSchema = {
  type: "object",
  properties: {
    name: {
      type: "string",
      example: "SubService1",
    },
  },
};
