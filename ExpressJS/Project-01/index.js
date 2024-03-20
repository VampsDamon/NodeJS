const express = require(`express`);

const users = require("./MOCK_DATA.json");

const fs = require("fs");

const app = express();

app.use((req, res, next) => {
  fs.appendFile(
    "log.txt",
    `\n ${Date.now()}:  -->  ${req.method}: -->  ${req.path}`,
    (err, data) => {
      next();
    }
  );
});

//+ SSR (Server side Rendering)
app.get("/users", (req, res) => {
  const html = `
     <ul>
      ${users
        .map(
          (user) => `<li>
      <ul>
      <li>${user.id}</li>
       <li>${user.first_name}</li>
       <li>${user.last_name}</li>

       <li>${user.job_title}</li>
       <li>${user.gender}</li>
      </ul></li>`
        )
        .join("")}
     </ul>
    `;
  res.send(html);
});

//! REST APIs
//+ SSR (Client side Rendering)
// - List all users
app.get("/api/users", (req, res) => res.json(users));

// -Middleware
app.use(express.urlencoded({ extended: false }));

// - Get the user with specific ID

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);

    const user = users.find((user) => user.id === id);
    if (user) res.json(user);
    else res.json({ id, error: "User not found" });
  })
  .post((req, res) => {
    //+ TODO: Add new user
    const body = req.body;

    if (
      !body ||
      !body.first_name ||
      !body.last_name ||
      !body.email ||
      !body.gender ||
      !body.job_title
    ) {
      return res.status(400).json({ message: "Invalid Fields" });
    }

    users.push({ id: users.length, ...body });

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
      return res.status(201).json({ status: "success", id: users.length - 1 });
    });
  })
  .patch((req, res) => {
    //+ TODO: Edit the user with ID
    const id = Number(req.params.id);
    const body = req.body;
    if (
      !body ||
      !body.first_name ||
      !body.last_name ||
      !body.email ||
      !body.gender ||
      !body.job_title
    ) {
      return res.status(400).json({ message: "Invalid Fields" });
    }

    const updatedUser = users.map((user) => {
      return user.id === id ? { id: id, ...body } : user;
    });
    fs.writeFile(
      "./MOCK_DATA.json",
      JSON.stringify(updatedUser),
      (err, data) => {
        return res.json({ status: "Sucess ", id });
      }
    );
  })
  .delete((req, res) => {
    //+ TODO: Delete the user with ID
    const id = Number(req.params.id);

    const updatedUser = users.filter((user) => user.id !== id);

    fs.writeFile(
      "./MOCK_DATA.json",
      JSON.stringify(updatedUser),
      (err, data) => {
        return res.json({ status: `User deleted`, id });
      }
    );
  });

app.listen(8000, () => console.log("Server Started"));
