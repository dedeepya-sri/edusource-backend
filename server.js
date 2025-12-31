const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const authMiddleware = require("./middleware/authMiddleware");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

app.use("/api", authRoutes);

// Protected resources route
// Protected resources API
app.get("/api/resources", authMiddleware, (req, res) => {
  res.json([
    {
      category: "Data Structures",
      slug: "data-structures",
      files: [
        {
          name: "Arrays",
          url: "http://localhost:5000/resources/data-structures/Arrays.pdf"
        },
        {
          name: "Strings",
          url: "http://localhost:5000/resources/data-structures/Strings.pdf"
        }
      ]
    },
    {
      category: "DLD",
      slug: "dld",
      files: [
        {
          name: "NumberSystem",
          url: "http://localhost:5000/resources/dld/NumberSystem.pdf"
        },
        {
          name: "Sequential-Circuits",
          url: "http://localhost:5000/resources/dld/Sequential-Circuits.pdf"
        }
      ]
    }
  ]);
});


app.use("/resources", express.static(__dirname + "/resources"));


app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
