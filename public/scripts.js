// Add an event listener to the document that triggers when the content is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  fetchCustomers(); // Fetch and display customers when the page loads
});

// Function to fetch customer data from the server
async function fetchCustomers() {
  const response = await fetch("/model/customer"); // Make a GET request to fetch customers
  const customers = await response.json(); // Parse the JSON response
  displayCustomers(customers); // Display the fetched customers
}

// Function to display a list of customers on the page
function displayCustomers(customers) {
  const customersDiv = document.getElementById("customers"); // Get the element to display customers
  customersDiv.innerHTML = ""; // Clear any existing content
  customers.forEach((customer) => {
    // Iterate over each customer
    const customerDiv = document.createElement("div"); // Create a new div for each customer
    customerDiv.innerHTML = `
      <p><strong>${customer.name}</strong> (${customer.email}) - Balance: $${customer.currentBalance}</p>
      <button onclick="viewCustomer('${customer._id}')">View</button>
    `; // Set the inner HTML to display customer info and a view button
    customersDiv.appendChild(customerDiv); // Append the customer div to the main container
  });
}

// Function to fetch and display details of a single customer
async function viewCustomer(customerId) {
  const response = await fetch(`/model/customer/${customerId}`); // Make a GET request to fetch a single customer by ID
  const customer = await response.json(); // Parse the JSON response
  const customerDetailsDiv = document.getElementById("customer-details"); // Get the element to display customer details
  customerDetailsDiv.innerHTML = `
    <h2>${customer.name}</h2>
    <p>Email: ${customer.email}</p>
    <p>Current Balance: $${customer.currentBalance}</p>
    <button onclick="initiateTransfer('${customer._id}')">Transfer Money</button>
  `; // Set the inner HTML to display detailed customer info and a transfer button
}

// Function to initiate a money transfer
function initiateTransfer(fromCustomerId) {
  const transferFormDiv = document.getElementById("transfer-form"); // Get the element to display the transfer form
  transferFormDiv.innerHTML = `
    <h3>Transfer Money</h3>
    <label for="toCustomer">To:</label>
    <select id="toCustomer"></select>
    <label for="amount">Amount:</label>
    <input type="number" id="amount" min="1">
    <button onclick="transferMoney('${fromCustomerId}')">Transfer</button>
  `; // Set the inner HTML to display the transfer form
  populateTransferOptions(); // Populate the customer options for transfer
}

// Function to populate the dropdown with customers for the transfer form
async function populateTransferOptions() {
  const response = await fetch("/model/customer"); // Make a GET request to fetch customers
  const customers = await response.json(); // Parse the JSON response
  const toCustomerSelect = document.getElementById("toCustomer"); // Get the select element for customers
  toCustomerSelect.innerHTML = ""; // Clear any existing options
  customers.forEach((customer) => {
    // Iterate over each customer
    const option = document.createElement("option"); // Create a new option element
    option.value = customer._id; // Set the value to the customer ID
    option.textContent = `${customer.name} (${customer.email})`; // Set the text to the customer name and email
    toCustomerSelect.appendChild(option); // Append the option to the select element
  });
}

// Function to handle the money transfer process
async function transferMoney(fromCustomerId) {
  const toCustomerId = document.getElementById("toCustomer").value; // Get the selected customer ID to transfer to
  const amount = parseFloat(document.getElementById("amount").value); // Get the amount to transfer
  const response = await fetch("/model/transfer", {
    method: "POST", // Set the method to POST for the transfer request
    headers: { "Content-Type": "application/json" }, // Set the content type to JSON
    body: JSON.stringify({ fromCustomerId, toCustomerId, amount }), // Send the transfer details as JSON
  });
  const result = await response.json(); // Parse the JSON response
  if (result.success) {
    // Check if the transfer was successful
    alert("Transfer successful!"); // Show a success message
    fetchCustomers(); // Refresh the customer list
    document.getElementById("customer-details").innerHTML = ""; // Clear the customer details section
    document.getElementById("transfer-form").innerHTML = ""; // Clear the transfer form section
  } else {
    alert("Transfer failed: " + result.message); // Show an error message if the transfer failed
  }
}
