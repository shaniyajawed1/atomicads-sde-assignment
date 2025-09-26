import express from "express";
import adminRoutes from "./routes/adminRoutes";
import userRoutes from "./routes/userRoutes";

const app = express();
const PORT = 5000;

app.use(express.json());

// Root endpoint
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Routes
app.use("/admin", adminRoutes);
app.use("/user", userRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
