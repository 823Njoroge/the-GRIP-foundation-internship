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
      {
        name: "user",
        email: "njorogeian823@gmail.com",
        currentBalance: 10000,
      },
      {
        name: "Bella Wairimu",
        email: "bellawairimu@gmail.com",
        currentBalance: 5000,
      },
      { name: "Bob Kimani", email: "bob@gmail.com", currentBalance: 3000 },
      {
        name: "Charlie Black",
        email: "charlie@gmail.com",
        currentBalance: 2000,
      },
      { name: "David Mwangi", email: "david@gmail.com", currentBalance: 4500 },
      { name: "Evelyn Mumbi", email: "eve@outlook.com", currentBalance: 7000 },
      { name: "Alice", email: "alice@gmail.com", currentBalance: 5000 },
      { name: "Job Allan", email: "bob@outlook.com", currentBalance: 3000 },
      { name: "Charlie", email: "charlie@gmail.com", currentBalance: 2000 },
      { name: "David", email: "david@gmail.com", currentBalance: 4500 },
      { name: "Eve", email: "eve@gmail.com", currentBalance: 7000 },
      // Add more customers as needed
    ];
    await Customer.insertMany(customers);
    console.log("Dummy data inserted");
    process.exit();
  })
  .catch((err) => console.log(err));
