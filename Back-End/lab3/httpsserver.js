import http from "http";

const array = [];
const PORT = 8080;

const app = http.createServer((req, res) => {

    const url = req.url;
    const method = req.method;

    // GET /msg
    if (url === "/msg" && method === "GET") {

        res.statusCode = 200;
        res.setHeader("Content-Type", "text/plain");
        res.end("Welcome to backend");

    }

    // GET /user
    else if (url === "/user" && method === "GET") {

        const userdata = {
            id: 101,
            name: "ansh",
            email: "ansh91630@gmail.com",
            department: "CSE"
        };

        console.log(JSON.stringify(userdata));

        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(userdata));

    }

    // POST /create
    else if (url === "/create" && method === "POST") {

        let body = "";

        req.on("data", (content) => {
            body = body + content;
        });

        req.on("end", () => {

            const data = JSON.parse(body);

            const newUser = {
                id: data.id,
                name: data.name,
                email: data.email,
                department: data.department
            };

            // Add user to array
            array.push(newUser);

            res.statusCode = 201;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(newUser));
        });
    }

    // Invalid route
    else {
        res.statusCode = 404;
        res.setHeader("Content-Type", "text/plain");
        res.end("Route not found");
    }
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});