const {Router} = require("express");
const bookRouter = Router();

const Book = require("./model")

const { getAllBooks, updateAuthor, addBook, deleteBook, deleteAll, updateDynamic } =  require("./controllers");

bookRouter.get("/books/getallbooks", getAllBooks);

bookRouter.post("/books/addbook", addBook);

bookRouter.put("/books/updatebookauthor", updateAuthor);

bookRouter.delete("/books/deletebook", deleteBook);

bookRouter.delete("/books/deleteall", deleteAll);

bookRouter.put("/books/updatebook", updateDynamic);

  // ---------------option 2 
  // const myFunc = (key, value) => {
  //   return {
  //     [key]: value,
  //   };
  // };

  // console.log(myFunc("michael"));
  // console.log(myFunc("michaelsNiece", "no name"));
  // console.log(myFunc("favFruit", "orange"));

  // {
  //   "title": "michaels book",
  //   "key": "genre",
  //   "value": "crime"
  // }
//   app.put("/books/updatebook", async (req, res) => {
//     try {
//       const updatedBook = await new Book.updateOne({title : req.body.title}, {key: req.body.value})
//       const successResponse = {
//         message: "success",
//         updatedBook: updatedBook,
//       };
//       res.status(200).json(successResponse);
//     } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "error", error: error });
//   }
// });

module.exports = bookRouter;
