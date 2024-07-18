const mongoose = require("mongoose");
const Customer = require("./models/customer"); // Adjust the path as necessary

mongoose
  .connect("mongodb://localhost:27017/bank", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    await Customer.deleteMany({});
    const customers = [
      { name: "Alice", email: "alice@example.com", currentBalance: 5000 },
      { name: "Bob", email: "bob@example.com", currentBalance: 3000 },
      { name: "Charlie", email: "charlie@example.com", currentBalance: 2000 },
      { name: "David", email: "david@example.com", currentBalance: 4500 },
      { name: "Eve", email: "eve@example.com", currentBalance: 7000 },
      // Add more customers as needed
    ];
    await Customer.insertMany(customers);
    console.log("Dummy data inserted");
    process.exit();
  })
  .catch((err) => console.log(err));
