const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  currentBalance: { type: Number, required: true },
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
