import express from "express";
import cors from "cors";
import userService from "./user-services.js";

const app = express();
const port = 8000;
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/users", (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    userService.getUsers(name, job)
        .then((result) => res.send({ users_list: result }))
        .catch(() => res.send(users));
});

app.get("/users/:id", (req, res) => {
    userService.findUserById(req.params.id)
        .then((result) => res.send({ users_list: result }))
        .catch(() => res.status(404).send("Resource doesn't exist."));
});

app.delete("/users/:id", (req, res) => {
    userService.deleteUserById(req.params.id)
        .then((result) => {
            res.status(204).send(result);
        })
        .catch(() => res.status(404).send("Resource not found."));
});

app.post('/users', (req, res) => {
    const add = req.body;
    userService.addUser(add)
        .then((addedUser) => res.status(201).send(addedUser))
        .catch(() => res.status(400).send("Invalid user data."));
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
