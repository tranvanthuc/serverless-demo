const express = require("express");
require("dotenv").config();
require("express-group-routes");

const serverless = require("serverless-http");
const bodyParser = require("body-parser");
const pool = require("./configs/dbConfig");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.group("/user", router => {
  // Handle user GET route for all user
  router.get("/", (req, res) => {
    const query = "SELECT * FROM users";
    pool.query(query, (err, results, fields) => {
      if (err) {
        const response = { data: null, message: err.message };
        res.send(response);
      }

      const users = [...results];
      const response = {
        data: users,
        message: "All users successfully retrieved."
      };
      res.send(response);
    });
  });

  router.get("/test/", (req, res) => {
    const response = {
      data: "Test",
      message: "Test user message"
    };
    res.send(response);
  });

  // Handle user GET route for specific user
  router.get("/:id", (req, res) => {
    const id = req.params.id;
    const query = `SELECT * FROM users WHERE id=${id}`;
    pool.query(query, (err, results, fields) => {
      if (err) {
        const response = { data: null, message: err.message };
        res.send(response);
      }

      const user = results[0];
      const response = {
        data: user,
        message: `user ${user.name} successfully retrieved.`
      };
      res.status(200).send(response);
    });
  });

  // Handle user POST route
  router.post("/", (req, res) => {
    const { name, height, weight, avatar } = req.body;

    const query = `INSERT INTO users (name, height, weight, avatar) VALUES ('${name}', '${height}', '${weight}', '${avatar}')`;
    pool.query(query, (err, results, fields) => {
      if (err) {
        const response = { data: null, message: err.message };
        res.send(response);
      }

      const { insertId } = results;
      const user = { id: insertId, name, height, weight, avatar };
      const response = {
        data: user,
        message: `user ${name} successfully added.`
      };
      res.status(201).send(response);
    });
  });

  // Handle user PUT route
  router.put("/:id", (req, res) => {
    const { id } = req.params;
    const query = `SELECT * FROM users WHERE id=${id} LIMIT 1`;
    pool.query(query, (err, results, fields) => {
      if (err) {
        const response = { data: null, message: err.message };
        res.send(response);
      }

      const { id, name, height, weight, avatar } = {
        ...results[0],
        ...req.body
      };
      const query = `UPDATE users SET name='${name}', height='${height}', weight='${weight}', avatar='${avatar}' WHERE id='${id}'`;
      pool.query(query, (err, results, fields) => {
        if (err) {
          const response = { data: null, message: err.message };
          res.send(response);
        }

        const user = {
          id,
          name,
          height,
          weight,
          avatar
        };
        const response = {
          data: user,
          message: `user ${name} is successfully updated.`
        };
        res.send(response);
      });
    });
  });

  // Handler user DELETE route
  router.delete("/:id", (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM users WHERE id=${id}`;
    pool.query(query, (err, results, fields) => {
      if (err) {
        const response = { data: null, message: err.message };
        res.send(response);
      }

      const response = {
        data: null,
        message: `user with id: ${id} successfully deleted.`
      };
      res.send(response);
    });
  });
});

// Handle in-valid route
app.all("*", function(req, res) {
  const response = { data: null, message: "Route not found!!" };
  res.status(400).send(response);
});

// wrap express app instance with serverless http function
module.exports.handler = serverless(app);
