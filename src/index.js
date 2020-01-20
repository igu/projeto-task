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

  const project = {
    id,
    title,
    tasks: []
  };

  projects.push(project);
  return res.json(project);
});

app.get("/projects", (req, res) => {
  return res.json(projects);
});

app.put("/projects/:id", (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);
  project.title = title;

  return res.json(project);
});

app.delete("projects/:id", (req, res) => {
  const { id } = req.params;

  const indexProject = projects.findIndex(p => p.id == id);
  projects.slice(indexProject, 1);

  return res.send("deleted");
});

app.post("/projects/:id/tasks", (req, res) => {
  const { id } = req.params;
  const { task } = req.body;

  const project = projects.find(p => p.id == id);
  project.tasks.push(task);

  return res.json(project);
});

app.listen(3000);
