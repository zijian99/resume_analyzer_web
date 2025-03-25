// Import required module
require("dotenv").config();
const express = require("express");
const cors = require("cors");

// Setup application
const app = express();

// Change the origin here to our frontend website url so that only API call from there is accepted when deployment if required
var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));

// Parse JSON and URL-encoded requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setup DB
const db = require("./app/models");
const Role = db.role;

// console.log(process.env.MONGO_URI)

db.mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(async () => { // Awaiting initial()
    console.log(`Successfully connected to MongoDB: ${db.mongoose.connection.name}`);
    // await initial();
  })
  .catch(err => {
    console.error("Connection error:", err);
    process.exit();
  });



// Root path to show that application is working
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the application." });
});

// Routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

// Set port and start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}.`);
});




// Async function to initialize roles(Run ONCE)
// async function initial() {
//   try {
//     const count = await Role.estimatedDocumentCount(); // No callback
//     if (count === 0) {
//       await Role.create({ name: "ROLE_USER" });
//       console.log("Added 'user' to roles collection");

//       await Role.create({ name: "ROLE_MODERATOR" });
//       console.log("Added 'moderator' to roles collection");

//       await Role.create({ name: "ROLE_ADMIN" });
//       console.log("Added 'admin' to roles collection");
//     }
//   } catch (err) {
//     console.error("Error initializing roles:", err);
//   }
// }