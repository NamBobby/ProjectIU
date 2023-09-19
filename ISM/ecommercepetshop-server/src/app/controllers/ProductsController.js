const Product = require("../models/Product");

class ProductsController {
  // [POST]
  async create(req, res, next) {
    try {
      const products = new Product(req.body);
      const result = await products.save();
      res.json({
        retCode: 0,
        retText: "Tạo thành công",
        retData: result,
      });
    } catch (error) {
      res.status(500).send(error);
    }
  }

  // [POST] get list with pagination
  getListWithPaginate(req, res, next) {
    // console.log("req", req);
    const getPagination = (page, size) => {
      const limit = size ? +size : 0;
      const offset = page === 1 ? 0 : (page - 1) * limit;

      return { limit, offset };
    };

    const {
      page,
      size,
      gender,
      weight,
      price,
      maxPrice,
      minPrice,
      productText,
    } = req.body;

    const filter = {};

    if (gender) {
      Object.assign(filter, { gender });
    }

    if (weight) {
      Object.assign(filter, { weight });
    }

    if (maxPrice || minPrice) {
      Object.assign(filter, { price: { $gte: minPrice, $lte: maxPrice } });
    }

    if (productText) {
      filter.name = { $regex: new RegExp(productText), $options: "i" };
    }

    const { limit, offset } = getPagination(page, size);

    Product.paginate(filter, { offset, limit })
      .then((data) => {
        res.json({
          retCode: 0,
          retText: "",
          retData: {
            totalItems: data.totalDocs,
            products: data.docs,
            totalPages: data.totalPages,
            currentPage: data.page - 1,
          },
        });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message,
        });
      });
  }

  // [GET] in detail
  async getDetail(req, res, next) {
    try {
      const result = await Product.findById(req.params.id).exec();
      res.json({
        retCode: 0,
        retText: "Thành công",
        retData: result,
      });
    } catch (error) {
      res.status(500).send(error);
    }
  }

  // [PUT]
  async update(req, res, next) {
    try {
      const productsDetail = await Product.findById(req.params.id).exec();
      productsDetail.set(req.body);
      const result = await productsDetail.save();
      res.json({
        retCode: 0,
        retText: "Thành công",
        retData: result,
      });
    } catch (error) {
      res.status(500).send(error);
    }
  }

  // [DELETE]
  async delete(req, res, next) {
    try {
      const result = await Product.deleteOne({
        _id: req.params.id,
      }).exec();
      res.json({
        retCode: 0,
        retText: "Thành công",
        retData: result,
      });
    } catch (error) {
      res.status(500).send(error);
    }
  }

  // POST
  // searchProduct(req, res, next) {
  //   const { productText } = req.body;
  //   // const query = { $text: { $search: productText } };
  //   // try {
  //   //   const tasks = await Product.find(query);
  //   //   res.json(tasks);
  //   // } catch (err) {
  //   //   console.error(err);
  //   //   res.status(500).send("Server Error");
  //   // }

  //   let params = [];
  //   params.keyword = productText;
  //   // console.log("params", params);
  //   const getListItem = async (params) => {
  //     let objWhere = {};
  //     if (params.keyword !== "") {
  //       objWhere.name = new RegExp(productText, "i") /* productText */; // đúng cấu trúc RegExp này thì mới search từng letter dc
  //     }
  //     // console.log("objWhere", objWhere);
  //     const result = await Product.find(objWhere);
  //     res.json(result);
  //   };
  //   getListItem(params);
  // }
}

module.exports = new ProductsController();
