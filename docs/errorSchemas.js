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

const content = {
  "application/json": {
    schema: {
      $ref: "#/components/schemas/Error",
    },
    example: {
      message: "Some String",
      status: "fail",
    },
  },
};

exports.NotFound404 = (desc) => ({
  description: desc || "404 Not Found",
  content,
});

exports.BadRequest400 = (desc) => ({
  description: desc || "400 Bad Request",
  content,
});
