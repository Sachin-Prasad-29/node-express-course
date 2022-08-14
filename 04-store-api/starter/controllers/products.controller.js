const Product = require('../models/product');

const getAllProductStatic = async (req, res) => {
    const products = await Product.find({ page: '2' });
    res.status(200).json({ products, nbHits: products.length });
};

const getAllProducts = async (req, res) => {
    const request = req.query;
    const products = await Product.find(request);
    res.status(200).json({ products, nbHits: products.length });
};

module.exports = {
    getAllProducts,
    getAllProductStatic,
};
