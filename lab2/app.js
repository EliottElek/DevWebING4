const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const metrics = require("./metrics");

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//exphbs => express handlebars
var exphbs = require("express-handlebars");

app.use("/static", express.static("public"));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//getting the metrics
app.get("/metrics.json", (req, res) => {
  metrics.get((err, data) => {
    if (err) throw err;
    res.status(200).json(data);
  });
});

app.get("/", function (req, res) {
  res.render("home");
});
app.get("/contact", function (req, res) {
  res.render("contact");
});
app.get("/about", function (req, res) {
  res.render("about");
});
app.get('/hello/:name/:lastname', 
  (req, res) =>  res.render('hello', {name: req.params.name, lastname: req.params.lastname})
)
app.get("*", (req, res) => res.render("404"));
app.listen(3000);
console.log("app running on port 3000");
