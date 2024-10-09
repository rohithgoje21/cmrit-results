const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const resultsRouter = require("./api/results"); // Import the results router

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Serve index.html file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Use the results API
app.use("/api/results", resultsRouter); // Updated to include the /api prefix

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
