exports.ErrorSchema = {
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

exports.NotFound404 = {
  description: "404 Not Found",
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
};

exports.BadRequest400 = {
  description: "400 Bad Request",
  content: { ...this.NotFound404.content },
};
