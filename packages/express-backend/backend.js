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
            job: "Aspring actress"
        },
        {
            id: "zap555",
            name: "Dennis",
            job: "Bartender"
        },
    ]
};


app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(
        `Example app listening at http://localhost:${port}`
    );
});

const findUsersByNameAndJob = (name, job) => {
    return users["users_list"].filter((user) => {
        return (
            (name ? user["name"] === name : true) &&
            (job ? user["job"] === job : true)
        );
    });
};

app.get("/users", (req, res) => {
    const name = req.query.name;
    const job = req.query.job;

    let result = findUsersByNameAndJob(name, job);
    if (result.length === 0) {
        res.status(404).send("Resource not Found.");
    } else {
        res.send(result);
    }
});

app.delete('/users/:id', (req, res) => {
    const id = req.params["id"]; //or req.params.id
    let result = findUserById(id);

    if (result !== undefined) {
        users.splice(result, 1);
        res.status(200).json({ message: 'User deleted successfully!' });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

const findUserById = (id) =>
    users["users_list"].find((user) => user["id"] === id);

app.get("/users/:id", (req, res) => {
    const id = req.params.id; //or req.params.id
    let result = findUserById(id);
    if (result === undefined) {
        res.status(404).send("Resource not found.");
    } else {
        res.send(result);
    }
});



const addUser = (user) => {
    users["users_list"].push(user);
    return user;
};

app.post("/users", (req, res) => {
    const userToAdd = req.body;
    addUser(userToAdd);
    res.send();
});
