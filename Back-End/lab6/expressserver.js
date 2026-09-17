import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 8080;
const users = [
	{
		id: 101,
		name: "ansh",
		email: "ansh91630@gmail.com",
		department: "CSE"
	}
];

app.use(express.json());

app.get("/", (req, res) => {
	res.status(200).json({
		message: "Express server is running",
		endpoints: [
			"GET /msg",
			"GET /user",
			"GET /users",
			"GET /user/:id",
			"POST /create",
			"PUT /update/:id",
			"DELETE /delete/:id"
		]
	});
});

app.get("/msg", (req, res) => {
	res.status(200).send("Welcome to backend");
});

app.get("/user", (req, res) => {
	const user = users[0] || {
		id: 101,
		name: "ansh",
		email: "ansh91630@gmail.com",
		department: "CSE"
	};

	console.log(JSON.stringify(user));
	res.status(200).json(user);
});

app.get("/users", (req, res) => {
	res.status(200).json(users);
});

app.get("/user/:id", (req, res) => {
	const user = users.find((item) => item.id === Number(req.params.id));

	if (!user) {
		return res.status(404).json({ error: "User not found" });
	}

	res.status(200).json(user);
});

app.post("/create", (req, res) => {
	const { id, name, email, department } = req.body;

	if (id === undefined || !name || !email || !department) {
		return res.status(400).json({
			error: "id, name, email, and department are required"
		});
	}

	const userExists = users.some((user) => user.id === Number(id));
	if (userExists) {
		return res.status(409).json({ error: "User with this id already exists" });
	}

	const newUser = { id: Number(id), name, email, department };
	users.push(newUser);

	res.status(201).json(newUser);
});

app.put("/update/:id", (req, res) => {
	const userId = Number(req.params.id);
	const index = users.findIndex((user) => user.id === userId);

	if (index === -1) {
		return res.status(404).json({ error: "User not found" });
	}

	const { name, email, department } = req.body;
	if (!name && !email && !department) {
		return res.status(400).json({
			error: "Provide at least one field to update: name, email, or department"
		});
	}

	if (name) users[index].name = name;
	if (email) users[index].email = email;
	if (department) users[index].department = department;

	res.status(200).json(users[index]);
});

app.delete("/delete/:id", (req, res) => {
	const userId = Number(req.params.id);
	const index = users.findIndex((user) => user.id === userId);

	if (index === -1) {
		return res.status(404).json({ error: "User not found" });
	}

	const deletedUser = users.splice(index, 1)[0];
	res.status(200).json({
		message: "User deleted successfully",
		user: deletedUser
	});
});

app.use((req, res) => {
	res.status(404).json({ error: "Route not found" });
});

app.use((error, req, res, next) => {
	if (error instanceof SyntaxError && error.status === 400 && "body" in error) {
		return res.status(400).json({ error: "Request body must contain valid JSON" });
	}

	next(error);
});

app.listen(PORT, () => {
	console.log(`Server is running at http://localhost:${PORT}`);
});