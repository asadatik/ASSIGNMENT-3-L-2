import express, { Request, Response } from "express";

import Book from "../models/book.models";

import { ObjectId } from "mongodb";

export const bookRoutes = express.Router();

// book database add oparation
bookRoutes.post("/books", async (req: Request, res: Response) => {
  try {
    const body = req.body;
    console.log(body, "data");
    const result = await Book.create(body);
    res.status(201).send({
      success: true,
      message: "Book created successfully",
      data: result,
    });
  } catch (error: unknown) {
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
});
// all book method operation
bookRoutes.get("/books", async (req: Request, res: Response) => {
  try {
    const filterBook = req.query?.filter as string;
    const sortBy = (req.query?.sortBy as string) || "createdAt";
    const sort = req.query?.sort === "desc" ? -1 : 1;
    const limit = req.query?.limit as string;
    const numberLimit = parseInt(limit) || 10;

    const query: Record<string, unknown> = {};
    if (filterBook) {
      query.genre = filterBook;
    }

    const sortFilter = {
      [sortBy]: sort,
    } as Record<string, 1 | -1>;

    const result = await Book.find(query).sort(sortFilter).limit(numberLimit);

    res.status(200).send({
      success: true,
      message: "Books retrieved successfully",
      data: result,
    });
  } catch (error: unknown) {
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
});
// single book get method oparation
bookRoutes.get("/books/:bookId", async (req: Request, res: Response) => {
  try {
    const id = req.params.bookId;
    const query = { _id: new ObjectId(id) };
    const result = await Book.findById(query);
    res.status(200).send({
      success: true,
      message: "Book retrieved successfully",
      data: result,
    });
  } catch (error: unknown) {
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
});
// single book copies update success
bookRoutes.put("/books/:bookId", async (req: Request, res: Response) => {
  try {
    const id = req.params.bookId;
    const body = req.body;
    // console.log(body);
    const result = await Book.findByIdAndUpdate(
      id,
      { $set: { copies: body.copies } },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Book updated successfully",
      data: result,
    });
  } catch (error: unknown) {
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
});
// single book delete oparation success
bookRoutes.delete("/books/:bookId", async (req: Request, res: Response) => {
  try {
    const id = req.params.bookId;
    await Book.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Book deleted successfully",
      data: null,
    });
  } catch (error: unknown) {
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
});
