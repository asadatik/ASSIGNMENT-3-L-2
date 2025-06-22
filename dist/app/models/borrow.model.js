"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const book_model_1 = __importDefault(require("./book.model"));
const borrowSchema = new mongoose_1.default.Schema({
    book: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Book", required: true },
    quantity: { type: Number, required: true, min: [1, "Quantity must be at least 1"] },
    dueDate: { type: Date, required: true }
}, { timestamps: true, versionKey: false });
borrowSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const borrow = this;
        const book = yield book_model_1.default.findById(borrow.book);
        if (!book) {
            return next(new Error("Book not found"));
        }
        if (book.copies < borrow.quantity) {
            return next(new Error("Not  available"));
        }
        next();
    });
});
borrowSchema.post("save", function (doc, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const book = yield book_model_1.default.findById(doc.book);
        if (book) {
            book.copies -= doc.quantity;
            if (book.copies <= 0) {
                book.copies = 0;
                book.available = false;
            }
            yield book.save();
        }
        next();
    });
});
const Borrow = mongoose_1.default.model("Borrow", borrowSchema);
exports.default = Borrow;
