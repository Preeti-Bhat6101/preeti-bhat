const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.set("trust proxy", 1);
const PORT = process.env.PORT || 5000;

const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  }),
);

// Middleware
app.use(express.json());

// Routes
const projectRoutes = require("./routes/projects");
const chronicleRoutes = require("./routes/chronicles");
const postRoutes = require("./routes/posts");
const authRoutes = require("./routes/auth");
const contactRoutes = require("./routes/contact");
const paintingRoutes = require("./routes/paintings");
const achievementRoutes = require("./routes/achievements");

app.use("/api/projects", projectRoutes);
app.use("/api/chronicles", chronicleRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/paintings", paintingRoutes);
app.use("/api/achievements", achievementRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Test route
app.get("/", (req, res) => {
  res.send("Preeti Bhat API is running!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
