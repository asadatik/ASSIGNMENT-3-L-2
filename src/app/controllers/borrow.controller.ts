import express, { Request, Response } from "express";
import Borrow from "../models/borrow.model";
export const borrowRoutes = express.Router();

//  book borrowed
borrowRoutes.post("/borrow", async (req: Request, res: Response) => {
  try {
    const { book, quantity, dueDate } = req.body;
    const borrow = await Borrow.create({ book, quantity, dueDate });
    res.status(201).send({
      success: true,
      message: "Book borrowed successfully",
      data: borrow,
    });
  } catch (error: unknown) {
    let errorMessage = "Something went wrong";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.status(500).send({
      success: false,
      message: "borrow book error",
      data: errorMessage,
    });
  } 
});

borrowRoutes.get("/borrow", async (req: Request, res: Response) => {
  try {
    const pipeline = await Borrow.aggregate([
      {
        $group: { _id: "$book", totalQuantity: { $sum: "$quantity" } },
      },
      {
        $lookup: {   from: "books", localField: "_id",  foreignField: "_id",    as: "bookDetails", },
      },
      {
        $unwind: "$bookDetails",
      },
      {
      $project: { _id: 0, totalQuantity: 1,  book: {   title: "$bookDetails.title",   isbn: "$bookDetails.isbn" }, },
      },
    ]);
    res.status(200).send({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data: pipeline,
    });
  } catch (error: unknown) {
    let errorMessage = "Something went wrong";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.status(500).send({
      success: false,
      message: "borrow book error",
      data: errorMessage,
    });
  }
});
