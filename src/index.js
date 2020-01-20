const express = require("express");

const app = express();

/*  
  =====================================
     PERMISSÃO JSON EXPRESS LINE  11
  =====================================
*/

app.use(express.json());

const projects = [];

app.post("/projects", (req, res) => {
  const { id, title } = req.body;
  projects.push({ id, title, tasks: [] });
  return res.json(projects);
});

app.get("/projects", (req, res) => {
  return res.json(projects);
});

app.listen(3000);
