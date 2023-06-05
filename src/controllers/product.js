import Joi from "joi";
import Product from "../models/product";

const productSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  description: Joi.string(),
  categoryId: Joi.string(),
});

const getAllProduct = async (req, res) => {
  const {
    _sort = "CreateAt",
    _oder = "asc",
    _limit = 10,
    _page = 1,
  } = req.query;

  const option = {
    page: _page,
    limit: _limit,
    sort: {
      [_sort]: _oder == "desc" ? 1 : 1,
    },
  };
  try {
    const { docs, totalDocs, totalPages } = await Product.paginate({}, options);
    if (docs.length === 0) {
      return res.status(400).json({ message: "Không có sản phẩm nào" });
    }
    return res.status(200).json({ data: docs, totalDocs, totalPages });
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};

const removeProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    return res.json({ message: "Xóa thành công", product });
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};

const createProduct = async (req, res) => {
  try {
    const body = req.body;
    const { error } = productSchema.validate(body);
    if (error) {
      const errors = error.details.map((errorItem) => errorItem.message);
      return res.status(400).json({
        message: errors,
      });
    }

    const product = await Product.create(body);
    if (!product) {
      return res.status(400).json({ message: "Thêm sản phẩm thất bại" });
    }
    return res.json({
      message: "Thêm sản phẩm thành công",
      product,
    });
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};
const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const data = await Product.findOneAndUpdate({ _id: id }, body, {
      new: true,
    });
    if (!data) {
      return res.status(400).json({ message: "Cập nhật thất bại" });
    }
    return res.json({
      message: "Cập nhật thành công",
      data,
    });
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};
const getOneProduct = async function (req, res) {
  try {
    const data = await Product.findOne({ _id: req.params.id });
    if (!data) {
      return res.status(400).json({ message: "Không có sản phẩm nào" });
    }
    return res.json(data);
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};

export { getAllProduct , createProduct , removeProduct , updateProduct , getOneProduct};
