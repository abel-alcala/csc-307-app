import express from "express";
import cors from "cors";

const app = express();
const port = 8000;
app.use(cors());
app.use(express.json());

const users = {
    users_list: [
        {
            id: "xyz789",
            name: "Charlie",
            job: "Janitor"
        },
        {
            id: "abc123",
            name: "Mac",
            job: "Bouncer"
        },
        {
            id: "ppp222",
            name: "Mac",
            job: "Professor"
        },
        {
            id: "yat999",
            name: "Dee",
            job: "Aspiring actress"
        },
        {
            id: "zap555",
            name: "Dennis",
            job: "Bartender"
        },
    ]
};

function generateRandomId() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz';
    let Id = '';
    const length = 6;
    for (let i = 0; i < length; i++) {
        Id += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return Id;
}

const findUsersByNameAndJob = (name, job) => {
    return users["users_list"].filter((user) => {
        return (
            (name ? user["name"] === name : true) &&
            (job ? user["job"] === job : true)
        );
    });
};

const findUserById = (id) =>
    users["users_list"].find((user) => user["id"] === id);

const addUser = (user) => {
    const generated_id = generateRandomId();
    const userWithId = { ...user, id: generated_id };
    users["users_list"].push(userWithId);
    return userWithId;
};

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/users", (req, res) => {
    const name = req.query.name;
    const job = req.query.job;

    let result = findUsersByNameAndJob(name, job);
    result = { users_list: result }; // Wrap in object for consistency
    if (result.users_list.length === 0) {
        res.status(404).send("Resource not found.");
    } else {
        res.send(result);
    }
});

app.get("/users/:id", (req, res) => {
    const id = req.params.id;
    let result = findUserById(id);
    if (result === undefined) {
        res.status(404).send("Resource not found.");
    } else {
        res.send(result);
    }
});

app.delete('/users/:id', (req, res) => {
    const id = req.params["id"];
    const userToDelete = findUserById(id);

    if (userToDelete !== undefined) {
        const index = users["users_list"].indexOf(userToDelete);
        users["users_list"].splice(index, 1);
        res.status(204).send("Resource null");
    } else {
        res.status(404).send(userToDelete);
    }
});

app.post('/users', (req, res) => {
    const add = req.body;
    const user = addUser(add);
    res.status(201).send(user);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
