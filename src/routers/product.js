import express from "express";
import { createProduct, getAllProduct, getOneProduct, removeProduct, updateProduct } from "../controllers/product";

const router = express.Router();

router.get('/products',getAllProduct)
router.get('/products/:id',getOneProduct)
router.post('/products/add',createProduct)
router.put('/products/:id/update',updateProduct)
router.delete('/products/:id',removeProduct)

export default router ;