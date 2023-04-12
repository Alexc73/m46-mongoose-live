require("dotenv").config();
require("./db/connection");

const express = require("express");

const app = express()

const Book = require("./books/model");

app.use(express.json());

app.get("/books/getallbooks", async (req, res) => {
    try {
        const books = await Book.find({})
        const successResponse = {
            message: "success",
            books: books,
        };
        res.status(200).json(successResponse)
    } catch (error) {
        console.log(error)
    }
});

app.post("/books/addbook", async (req, res) => {
    try {
        const newBook = await Book.create({
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre,
        });
        const successResponse = {
            message: "success",
            newBook: newBook,
        };
        res.status(201).json(successResponse)
    } catch (error) {
        console.log(error);
        
    }
});

// PUT route to update a book's author
app.put("/books/:id/updateauthor", async (req, res) => {
    try {
      const updatedBook = await Book.findByIdAndUpdate(
        req.params.id,
        { author: req.body.author },
        { new: true }
      );
      if (!updatedBook) {
        return res.status(404).json({ message: "Book not found" });
      }
      const successResponse = {
        message: "success",
        updatedBook: updatedBook,
      };
      res.status(200).json(successResponse);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error" });
    }
  });
  
  // DELETE route to delete a book
  app.delete("/books/:id/deletebook", async (req, res) => {
    try {
      const deletedBook = await Book.findByIdAndDelete(req.params.id);
      if (!deletedBook) {
        return res.status(404).json({ message: "Book not found" });
      }
      const successResponse = {
        message: "success",
        deletedBook: deletedBook,
      };
      res.status(200).json(successResponse);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error" });
    }
  });


app.listen(5001, () => console.log("Server is listening"));

