const express = require("express");
const cors = require("cors");
const dbConfig = require("./app/config/db.config");
const cookieParser = require('cookie-parser');
const app = express();


var corsOptions = {
  origin: '*',
};

app.use(cors({origin: 'http://localhost:5173',credentials:true}));
const productRoutes = require("./app/routes/productoRoute")
// parse requests of content-type - application/json
app.use(express.json());
app.use(cookieParser())
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
const Role = db.role;
const Producto=db.producto
const Category=require("./app/models/categoria");
db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
app.use(require("./app/routes/categoryRoute"))
app.use(productRoutes);
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});



function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
  Category.estimatedDocumentCount((err2, count2) => {
    if (!err2 && count2 === 0) {
      new Category({
        name: "mascotas",
        description:"juguetes y mas"
      }).save(err2 => {
        if (err2) {
          console.log("error", err2);
        }

        console.log("added 'mascotas' to category collection");
      });
      new Category({
        name: "pete",
        description:"pete y mas"
      }).save(err2 => {
        if (err2) {
          console.log("error", err2);
        }

        console.log("added 'pete' to category collection");
      });
      
    }
  });
}
