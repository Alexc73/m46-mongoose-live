const Book = require("./model")

const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find({})
        res.status(200).json({message: "success", books: books});
    } catch (error) {
        console.log(error)
    }
};

const addBook = async (req, res) => {
    try {
        const newBook = await Book.create({
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre,
        });
        res.status(201).json({message: "success", newBook: newBook});
    } catch (error) {
        console.log(error);
    }
};

const updateAuthor = async (req, res) => {
    try{
        const updatedBook = await Book.updateOne(
          {title: req.body.title},
          {author: req.body.author}
        );
        res.status(203).json({message: "success", updatedBook: updatedBook})
      } catch (error) {
        console.log(error);
      }
}

const deleteBook = async (req, res) => {
try {
    const deletedBook = await Book.deleteOne({ title: req.body.title });
    res.status(204).json({message: "success", deleteBook: deleteBook});
  } catch (error) {
    console.log(error);
  }
}

const deleteAll = async (req, res) => {
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
}

const updateDynamic = async (req, res) => {
try {
    const filter = { title: req.query.title };
    const update = { $set: {} };
    if (req.body.title) update.$set.title = req.body.title;
    if (req.body.author) update.$set.author = req.body.author;
    if (req.body.genre) update.$set.genre = req.body.genre;
    const options = { new: true };
    const updatedBook = await Book.findOneAndUpdate(filter, update, options);
    res.status(200).json({message: "success", updatedBook: updatedBook });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error", error: error });
  }
}

module.exports ={
    getAllBooks, addBook, updateAuthor, deleteBook, deleteAll, updateDynamic
}
