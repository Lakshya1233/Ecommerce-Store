import express from "express";
import {
    createProductController, getProductController, getSingleProductController, productCategoryController,
    productCountController,
    productFiltersController,
    productListController,
    productPhotoController,
    realtedProductController,
    searchProductController,
    deleteProductController,
    updateProductController
} from "../config/controllers/productController.js";
import { isAdmin, requireSignIn } from "../config/middlewares/authMiddleware.js";
import formidable from "express-formidable";

const router = express.Router();



router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController);
router.put(
    "/update-product/:pid",
    requireSignIn,
    isAdmin,
    formidable(),
    updateProductController
);

router.get('/get-product', getProductController);
router.get('/get-product/:slug', getSingleProductController);


router.get("/product-photo/:pid", productPhotoController);

//delete rproduct
router.delete("/delete-product/:pid", deleteProductController);

//filter product
router.post("/product-filters", productFiltersController);

//product count
router.get("/product-count", productCountController);

//product per page
router.get("/product-list/:page", productListController);

//search product
router.get("/search/:keyword", searchProductController);

//similar product
router.get("/related-product/:pid/:cid", realtedProductController);

//category wise product
router.get("/product-category/:slug", productCategoryController);



export default router;