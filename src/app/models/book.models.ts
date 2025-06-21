import { model, Schema } from "mongoose";
const bookSchema = new Schema(
  {
    title: { type: String, required: [true, "title field is required"] },
    author: { type: String, required: [true, "author field is required"] },
    genre: {
      type: String,
      required: [true, "genre field is required"],
      enum: [
        "FICTION",
        "NON_FICTION",
        "SCIENCE",
        "HISTORY",
        "BIOGRAPHY",
        "FANTASY",
      ],
    },
    isbn: {
      type: String,
      required: [true, "isbn field is required"],
      unique: [true, "This isbn is already exist"],
    },
    description: { type: String },
    copies: {
      type: Number,
      required: [true, "copies field is required"],
      min: [0, "Negative value not allow"],
    },
    available: { type: Boolean, default: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const Book = model("Book", bookSchema);
