import mongoose from "mongoose";

const genres = [
  "FICTION",
  "NON_FICTION",
  "SCIENCE",
  "HISTORY",
  "BIOGRAPHY",
  "FANTASY",
];

interface IBook extends mongoose.Document {
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
  isAvailable(): boolean;
}

const bookSchema = new mongoose.Schema<IBook>(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
      enum: genres,
    },
    isbn: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    copies: {
      type: Number,
      required: true,
      min: [0, "Copies must be grater than 0"],
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

bookSchema.methods.isAvailable = function () {
  return this.copies > 0;
};

bookSchema.statics.getAvailableBooks = function () {
  return this.find({ available: true });
};

bookSchema.pre("save", function (next) {
  this.available = this.copies > 0;
  next();
});

const Book = mongoose.model<IBook>("Book", bookSchema);

export default Book;
