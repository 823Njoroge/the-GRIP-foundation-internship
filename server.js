const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const Customer = require("./models/customer");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/bank", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected...");
  })
  .catch((err) => console.error(err));

// API routes
app.get("/api/customers", async (req, res) => {
  const customers = await Customer.find();
  res.json(customers);
});

app.get("/api/customers/:id", async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  res.json(customer);
});

app.post("/api/transfer", async (req, res) => {
  const { fromCustomerId, toCustomerId, amount } = req.body;

  const fromCustomer = await Customer.findById(fromCustomerId);
  const toCustomer = await Customer.findById(toCustomerId);

  if (!fromCustomer || !toCustomer) {
    return res
      .status(404)
      .json({ success: false, message: "Customer not found" });
  }

  if (fromCustomer.currentBalance < amount) {
    return res
      .status(400)
      .json({ success: false, message: "Insufficient balance" });
  }

  fromCustomer.currentBalance -= amount;
  toCustomer.currentBalance += amount;

  await fromCustomer.save();
  await toCustomer.save();

  res.json({ success: true });
});

// Catch-all to serve index.html for any other routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
