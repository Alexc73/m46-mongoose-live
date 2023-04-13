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
  
app.put("/books/updatebookauthor", async (req, res) =>{
  try{
  const updatedBook = await Book.updateOne(
    {title: req.body.title},
    {author: req.body.author}
  );
  const successResponse = {
    message: "success",
    updatedBook: updatedBook,
  };
  res.status(203).json(successResponse)
} catch (error) {
  console.log(error);
}
});
  
  // DELETE route to delete a book
  app.delete("/books/deletebook", async (req, res) => {
    try {
      const deletedBook = await Book.deleteOne({ title: req.body.title });
      const successResponse = {
        message: "success",
        deletedBook: deletedBook,
      };
      res.status(204).json(successResponse);
    } catch (error) {
      console.log(error);
    }
  });

  // DELETE route to delete all books

  app.delete("/books/deleteall", async (req, res) => {
    try {
      const deletedBooks = await Book.deleteMany({});
      const successResponse = {
        message: "success",
        deletedBooks: deletedBooks,
      };
      res.status(204).json(successResponse);
    } catch (error) {
      console.log(error);
    }
  });

  //  dynamic updates:  search for the book and edit any field.
  app.put("/books/updatebook", async (req, res) => {
    try {
      const filter = { title: req.query.title };
      const update = { $set: {} };
      if (req.body.title) update.$set.title = req.body.title;
      if (req.body.author) update.$set.author = req.body.author;
      if (req.body.genre) update.$set.genre = req.body.genre;
      const options = { new: true };
      const updatedBook = await Book.findOneAndUpdate(filter, update, options);
  
      const successResponse = {
        message: "success",
        updatedBook: updatedBook,
      };
      res.status(200).json(successResponse);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "error", error: error });
    }
  });


app.listen(5002, () => console.log("Server is listening"));

