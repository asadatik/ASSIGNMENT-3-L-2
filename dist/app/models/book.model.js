"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const genres = [
    "FICTION",
    "NON_FICTION",
    "SCIENCE",
    "HISTORY",
    "BIOGRAPHY",
    "FANTASY",
];
const bookSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true, enum: genres },
    isbn: { type: String, required: true, unique: true },
    description: { type: String, },
    copies: { type: Number, required: true, min: [0, "Copies must be grater than 0"] },
    available: { type: Boolean, default: true },
}, {
    timestamps: true,
    versionKey: false,
});
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
const Book = mongoose_1.default.model("Book", bookSchema);
exports.default = Book;
