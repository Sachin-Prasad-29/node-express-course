const Product = require('../models/product');

const getAllProductStatic = async (req, res) => {
    const search = 'ab';
    const products = await Product.find({ price: { $gt: 30 } })
        .sort('price')
        .select('name price')
        .limit(10)
        .skip(2);
    res.status(200).json({ products, nbHits: products.length });
};

const getAllProducts = async (req, res) => {
    const { featured, company, name, sort, fields, numericFilters } = req.query;
    const queryObject = {};
    if (featured) {
        queryObject.featured = featured === 'true' ? true : false;
    }
    if (company) {
        queryObject.company = company;
    }
    if (name) {
        queryObject.name = {
            $regex: name,
            $options: 'i',
        };
    }

    if (numericFilters) {
        const operatormap = {
            '>': '$gt',
            '>=': '$gte',
            '=': '$eq',
            '<': '$lt',
            '<=': '$lte',
        };
        const regEx = /\b(<|>|>=|<=|=)\b/g;
        let filters = numericFilters.replace(regEx, (match) => `-${operatormap[match]}-`);
        console.log(filters);
        const options = ['price', 'rating'];
        filters = filters.split(',').forEach((item) => {
            const [field, operator, value] = item.split('-');
            if (options.includes(field)) {
                queryObject[field] = { [operator]: Number(value) };
            }
        });
    }

    let result = Product.find(queryObject);
    if (sort) {
        const sortList = sort.split(',').join(' ');
        result = result.sort(sortList);
    } else {
        result = result.sort('createdAt'); // default sorting based on created time
    }

    if (fields) {
        const fieldList = fields.split(',').join(' ');
        result = result.select(fieldList);
    }
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    result = result.skip(skip).limit(limit);

    const products = await result;
    res.status(200).json({ products, nbHits: products.length });
};

module.exports = {
    getAllProducts,
    getAllProductStatic,
};
