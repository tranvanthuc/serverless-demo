"use strict";

module.exports.handler = (event, context, callback) => {
  const { EXAMPLE_VARIABLE, MY_VARIABLE } = process.env;
  const response = {
    env: {
      EXAMPLE_VARIABLE,
      MY_VARIABLE
    },
    statusCode: 200,
    body: JSON.stringify({
      message: `Hello, the current time is ${new Date().toTimeString()}.`
    })
  };

  callback(null, response);
};
