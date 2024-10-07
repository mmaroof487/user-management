const express = require("express");
const app = express();
const path = require("path");
const userModel = require("./models/user");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
 res.render("index");
});
app.get("/read", async (req, res) => {
 let user = await userModel.find();
 res.render("read", { user });
});

app.post("/create", async (req, res) => {
 let createdUser = await userModel.create({
  name: req.body.name,
  email: req.body.email,
  url: req.body.url,
 });
 res.redirect("/");
 console.log("USER CREATED");
});

app.get("/delete/:email", async (req, res) => {
 let deleted = await userModel.findOneAndDelete({ email: req.params.email });
 console.log("USER DELETED");
 res.redirect("/read");
});
app.get("/edit/:email", async (req, res) => {
 let user = await userModel.findOne({ email: req.params.email });
 res.render("update", { user });
});
app.post("/update/:email", async (req, res) => {
 let user = await userModel.findOneAndUpdate({ email: req.params.email }, { name: req.body.name, email: req.body.email, url: req.body.url });
 res.redirect("/read");
});

app.listen(3000);
