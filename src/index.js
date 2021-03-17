const express = require("express");

const { v4: uuid } = require("uuid");

const app = express();

app.use(express.json());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body
  const id = uuid()
  let likes = 0

  const repository = {
    id,
    title,
    url,
    techs: techs,
    likes
  };

  repositories.push(repository)

  return response.status(201).json({id, title, url, techs, likes});
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const {title, url, techs} = request.body;

  let repository = repositories.find(repository => repository.id === id);

  if (!repository) {
    return response.status(404).json({ error: "Repository not found" });
  }

  //const uPrepository = { ...repositories[repositoryIndex], ...updatedRepository };

  repository.title = title
  repository.url = url
  repository.techs = techs

  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  let repository = repositories.find(repository => repository.id === id)
  let repositoryIndex = repositories.findIndex(repository => repository.id === id)

  if (!repository) {
    return response.status(404).json({ error: "Repository not found" });
  }

  repositories.splice(repositoryIndex, 1);
  
  return response.status(204).send();
  
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  let repository = repositories.find(repository => repository.id === id);

  if (!repository) {
    return response.status(404).json({ error: "Repository not found" });
  }

  repository.likes = repository.likes + 1

  return response.json({likes: repository.likes});
});

module.exports = app;
