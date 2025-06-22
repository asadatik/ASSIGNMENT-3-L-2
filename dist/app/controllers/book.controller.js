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
exports.bookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const book_model_1 = __importDefault(require("../models/book.model"));
const mongodb_1 = require("mongodb");
exports.bookRoutes = express_1.default.Router();
// books post
exports.bookRoutes.post("/books", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        console.log(body, "data");
        const result = yield book_model_1.default.create(body);
        res.status(201).send({
            success: true,
            message: "Book created successfully",
            data: result,
        });
    }
    catch (error) {
        let errorMessage = "Something went wrong";
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        res.status(500).send({
            success: false,
            message: "Book create Error",
            data: errorMessage,
        });
    }
}));
// al
exports.bookRoutes.get("/books", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    try {
        const filterBook = (_a = req.query) === null || _a === void 0 ? void 0 : _a.filter;
        const sortBy = ((_b = req.query) === null || _b === void 0 ? void 0 : _b.sortBy) || "createdAt";
        const sort = ((_c = req.query) === null || _c === void 0 ? void 0 : _c.sort) === "desc" ? -1 : 1;
        const limit = (_d = req.query) === null || _d === void 0 ? void 0 : _d.limit;
        const numberLimit = parseInt(limit) || 10;
        const query = {};
        if (filterBook) {
            query.genre = filterBook;
        }
        const sortFilter = {
            [sortBy]: sort,
        };
        const result = yield book_model_1.default.find(query).sort(sortFilter).limit(numberLimit);
        res.status(200).send({
            success: true,
            message: "Books retrieved successfully",
            data: result,
        });
    }
    catch (error) {
        let errorMessage = "Something went wrong";
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        res.status(500).send({
            success: false,
            message: "All book filter get error",
            data: errorMessage,
        });
    }
}));
// single book get method oparation
exports.bookRoutes.get("/books/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.bookId;
        const query = { _id: new mongodb_1.ObjectId(id) };
        const result = yield book_model_1.default.findById(query);
        res.status(200).send({
            success: true,
            message: "Book retrieved successfully",
            data: result,
        });
    }
    catch (error) {
        let errorMessage = "Something went wrong";
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        res.status(500).send({
            success: false,
            message: "single book get error",
            data: errorMessage,
        });
    }
}));
// single book copies update success
exports.bookRoutes.put("/books/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.bookId;
        const body = req.body;
        // console.log(body);
        const result = yield book_model_1.default.findByIdAndUpdate(id, { $set: { copies: body.copies } }, { new: true });
        res.status(200).send({
            success: true,
            message: "Book updated successfully",
            data: result,
        });
    }
    catch (error) {
        let errorMessage = "Something went wrong";
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        res.status(500).send({
            success: false,
            message: "book update error",
            data: errorMessage,
        });
    }
}));
// single book delete oparation success
exports.bookRoutes.delete("/books/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.bookId;
        yield book_model_1.default.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            message: "Book deleted successfully",
            data: null,
        });
    }
    catch (error) {
        let errorMessage = "Something went wrong";
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        res.status(500).send({
            success: false,
            message: "book delete error",
            data: errorMessage,
        });
    }
}));
