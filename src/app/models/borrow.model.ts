import mongoose from "mongoose";
import Book from "./book.model";

interface IBorrow extends mongoose.Document {
  book: mongoose.Types.ObjectId;
  quantity: number;
  dueDate: Date;
}
const borrowSchema = new mongoose.Schema<IBorrow>(
  {
    book: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true},
    quantity: { type: Number, required: true, min: [1, "Quantity must be at least 1"] },
    dueDate: { type: Date, required: true }},
  { timestamps: true,  versionKey: false}
);

borrowSchema.pre("save", async function (next) {
  const borrow = this as IBorrow;
  const book = await Book.findById(borrow.book);

  if (!book) {
    return next(new Error("Book not found"));
  }

  if (book.copies < borrow.quantity) {
    return next(new Error("Not  available"));
  }

  next();
});
borrowSchema.post("save", async function (doc, next) {
  const book = await Book.findById(doc.book);

  if (book) {
    book.copies -= doc.quantity;

    if (book.copies <= 0) {
      book.copies = 0;
      book.available = false;
    }

    await book.save();
  }

  next();
});

const Borrow = mongoose.model<IBorrow>("Borrow", borrowSchema);

export default Borrow;
