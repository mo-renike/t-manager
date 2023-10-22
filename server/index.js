import express from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import mysql from "mysql2";

const app = express();

// Define your GraphQL schema
const schema = buildSchema(`
  type Task {
    id: Int
    title: String
    description: String
  }

  type Query {
    tasks: [Task]
  }
`);

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "task_manager",
});

const root = {
  tasks: () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM tasks", (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  },
};

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
