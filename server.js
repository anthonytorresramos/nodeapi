const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/productModel");
const app = express();

//json middleware
app.use(express.json());

// form encode - middleware
app.use(express.urlencoded({ extended: false }));

//routes

app.get("/", (req, res) => {
  res.send(`Hello Node API !!!!`);
});

app.get("/blog", (req, res) => {
  res.send(`Hello Blog`);
});

// GET REQUEST (ALL PRODUCTS)
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find({}); // find with empty braces means it will get all data
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET REQUEST (ALL PRODUCTS)
app.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params; // this line so we can get the id from the parameters
    const product = await Product.findById(id); // findById to find specific
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE REQUEST
app.put("/products/:id", async (req, res) => {
  try {
    const { id } = req.params; // this line so we can get the id from the parameters
    const product = await Product.findByIdAndUpdate(id, req.body);
    //we cannot find any product in the database
    if (!product) {
      return res
        .status(404)
        .json({ message: `cannot find any product with ID ${id}` });
    }
    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// deleting product
app.delete("/products/:id", async (req, res) => {
  try {
    const { id } = req.params; // this line so we can get the id from the parameters
    const product = await Product.findByIdAndDelete(id, req.body);
    //we cannot find any product in the database
    if (!product) {
      return res
        .status(404)
        .json({ message: `cannot find any product with ID ${id}` });
    }
    //const updatedProduct = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST REQUEST : http://localhost:3000/product
// in body JSON just put it something like this
/*
    {
    "name": "soysauce",
    "quantity": 2,
    "price": 750,
    "image": "https://placehold.co/600x400"
    }
*/
app.post("/product", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

mongoose.set("strict", false);

mongoose
  .connect(
    "mongodb+srv://admin:s5pqrd123@arapi.qpru47k.mongodb.net/NODE-API?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected to MongoDB");
    app.listen(3000, () => {
      console.log(`node API app is running on port 3000`);
    });
  })
  .catch(() => {
    console.log(error);
  });
