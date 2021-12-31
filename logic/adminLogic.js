const Product = require('../models/Product');
const Category = require('../models/Category');

exports.newProduct = async (req, res, next) => {
  try {
    const { group, name, image, description, brand, price, countInStock } =
      req.body;

    const categoryGroup = await Category.findOne({ group });
    const product = await Product({
      category: categoryGroup,
      name,
      image,
      description,
      brand,
      price,
      countInStock,
    });
    await product.save();
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

exports.editProduct = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const { name, image, description, brand, price, countInStock } = req.body;

    let product = await Product.findById(productId);
    product.name = name;
    product.image = image;
    product.description = description;
    product.brand = brand;
    product.price = price;
    product.countInStock = countInStock;
    product.save();
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};
