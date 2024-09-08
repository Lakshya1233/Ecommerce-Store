import express from "express";
import { isAdmin, requireSignIn } from "../config/middlewares/authMiddleware.js";
import {
    updateCategoryController,
    createCategoryController,
    categoryControlller,
    singleCategoryController,
    deleteCategoryController

} from "../config/controllers/categoryController.js";

const router = express.Router();

//routes
// create category
router.post(
    "/create-category",
    requireSignIn,
    isAdmin,
    createCategoryController
);

//update category

router.put('/update-category/:id', requireSignIn, isAdmin, updateCategoryController);

//get all
router.get('/get-category', categoryControlller);

//single
router.get('/single-category/:slug', singleCategoryController);


//delete
router.delete('/delete-category/:id', requireSignIn, isAdmin, deleteCategoryController);


export default router;