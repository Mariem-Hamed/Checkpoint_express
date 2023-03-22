const express = require("express");
const app = express();
const path = require("path");

// define Middleware
const workingHoursMiddleware = (req, res, next) => {
  const date = new Date();
  const dayOfWeek = date.getDay();
  const hour = date.getHours();
  if (dayOfWeek >= 1 && dayOfWeek <= 5 && hour >= 9 && hour <= 17) {
    next();
  } else {
    res.send("Sorry, the website is only available during working hours");
  }
};

// apply Middleware
app.use(workingHoursMiddleware);

//Define the routes

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "home.html"));
});

app.get("/services", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "Ourservices.html"));
});

app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "Contact.html"));
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
