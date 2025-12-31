const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const authMiddleware = require("./middleware/authMiddleware");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error("MongoDB connection error:", err));

// Auth routes
app.use("/api", authRoutes);

// Serve static resources
app.use("/resources", express.static(__dirname + "/resources"));

// Protected resources API
app.get("/api/resources", authMiddleware, (req, res) => {
  const host = `${req.protocol}://${req.get("host")}`;
  res.json([
    {
      category: "Data Structures",
      slug: "data-structures",
      files: [
        { name: "Arrays", url: `${host}/resources/data-structures/Arrays.pdf` },
        { name: "Strings", url: `${host}/resources/data-structures/Strings.pdf` }
      ]
    },
    {
      category: "DLD",
      slug: "dld",
      files: [
        { name: "NumberSystem", url: `${host}/resources/dld/NumberSystem.pdf` },
        { name: "Sequential-Circuits", url: `${host}/resources/dld/Sequential-Circuits.pdf` }
      ]
    }
  ]);
});

// Start server on Render-assigned PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
