const express = require("express");

const app = express();

/*  
  =====================================
     PERMISSÃO JSON EXPRESS LINE  11
  =====================================
*/

app.use(express.json());

const projects = [];

/*  
  ==============================================
     MIDDLEWARES PROJECT-TASK LINES  23 AND 30
  ==============================================
*/

function logAppReq(req, res, next) {
  console.count("Contagem de requisições");
  return next();
}

app.use(logAppReq);

function projectExists(req, res, next) {
  const { id } = req.params;
  const project = projects.find(project => project.id == id);

  if (!project) {
    return res.status(400).json({ error: "project not exists" });
  }

  return next();
}

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

app.put("/projects/:id", projectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);
  project.title = title;

  return res.json(project);
});

app.delete("/projects/:id", projectExists, (req, res) => {
  const { id } = req.params;

  const indexProject = projects.findIndex(p => p.id == id);
  projects.splice(indexProject, 1);

  return res.json(projects);
});

app.post("/projects/:id/tasks", projectExists, (req, res) => {
  const { id } = req.params;
  const { task } = req.body;

  const project = projects.find(p => p.id == id);
  project.tasks.push(task);

  return res.json(project);
});

app.listen(3000);
