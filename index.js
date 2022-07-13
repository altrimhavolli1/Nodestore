const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const MongoDbStore = require("connect-mongodb-session")(session);

require("./util/database");

const User = require("./models/user");

const MOGNODB_URI = "mongodb://localhost:27017/nodeStore";

const app = express();
const store = new MongoDbStore({
  uri: MOGNODB_URI,
  collection: "sessions",
});

app.set("view engine", "ejs");
app.set("views", "views");

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "http://localhost:";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use((req, res, next) => {
  User.findById("62cd8123c71669cb93d0dc98")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

const errorController = require("./controllers/error");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

app.listen(PORT, () => console.log(`Server running on: ${HOST}${PORT}`));
