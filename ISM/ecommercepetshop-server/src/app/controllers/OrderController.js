const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const User = require("../models/User");

class OrderController {
  async createOrder(req, res, next) {
    // statusOrder: gom 3 trang thai: 0 la cho thanh toan, 1 la thanh toan thanh cong, 2 la huy giao dich

    // methodPayment: gom 2 trang thai: 0 la thanh toan online, 1 la thanh toan truc tiep

    // methodReiceive: gom 2 trang thai: 0 la giao hang online, 1 la nhan hang truc tiep

    try {
      const order = new Order(req.body);
      const result = await order.save();
      res.status(200).json({
        retCode: 0,
        retText: "Create successfully",
        retData: result,
      });
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async getListOrder(req, res, next) {
    const getPagination = (page, size) => {
      const limit = size ? +size : 0;
      const offset = page === 1 ? 0 : (page - 1) * limit;

      return { limit, offset };
    };
    const { page, size, productText } = req.body;

    const filter = {};

    if (productText) {
      filter.name = { $regex: new RegExp(productText), $options: "i" };
    }

    const { limit, offset } = getPagination(page, size);

    Order.paginate(filter, { offset, limit })
      .then(async (data) => {
        const { totalDocs, docs, totalPages, page } = data || {};
        const listOrder = docs.map(async (item) => {
          const dataUser = await User.findById(item.userId);
          const dataCart = await Cart.findById(item.cartId);
          return {
            ...item,
            userId: dataUser,
            cartId: dataCart,
          };
        });
        const resolvedPromises = await Promise.all(listOrder);
        const resultData = resolvedPromises.map((item) => {
          const { _doc, userId, cartId } = item || {};
          return {
            ..._doc,
            userId,
            cartId,
          };
        });
        res.json({
          retCode: 0,
          retText: "List order",
          retData: {
            totalItems: totalDocs,
            orders: resultData,
            totalPages: totalPages,
            currentPage: page - 1,
          },
        });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message,
        });
      });
  }

  async getDetailOrder(req, res, next) {
    try {
      const result = await Order.findById(req.params.id).exec();

      const { userId, cartId, ...rest } = result || {};
      const userInfo = await User.findById(userId);
      const cartInfo = await Cart.findById(cartId);

      const listCartDetail = cartInfo._doc.listCart.map(async (item) => {
        const { _id, totalPrice, totalItem } = item || {};
        const data = await Product.findById(_id);
        return {
          totalPrice,
          totalItem,
          ...data,
        };
      });

      const resolvedPromises = await Promise.all(listCartDetail);

      const cartDetail = {
        ...cartInfo._doc,
        listCart: resolvedPromises.map((item) => {
          const { totalItem, totalPrice, _doc } = item || {};
          return {
            ..._doc,
            totalItem,
            totalPrice,
          };
        }),
      };

      const detailOrder = {
        ...rest._doc,
        userId: userInfo,
        cartId: cartDetail,
      };

      res.json({
        retCode: 0,
        retText: "Successfully",
        retData: detailOrder,
      });
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async deleteDetailOrder(req, res, next) {
    try {
      const result = await Order.deleteOne({
        _id: req.params.id,
      }).exec();
      res.json({
        retCode: 0,
        retText: "Successfully",
        retData: result,
      });
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async updateOrder(req, res, next) {
    try {
      const orderDetail = await Order.findById(req.params.id).exec();
      orderDetail.set(req.body);
      const result = await orderDetail.save();
      res.json({
        retCode: 0,
        retText: "Successfully",
        retData: result,
      });
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async getListOrderClient(req, res, next) {
    const getPagination = (page, size) => {
      const limit = size ? +size : 0;
      const offset = page === 1 ? 0 : (page - 1) * limit;

      return { limit, offset };
    };
    const { page, size, productText, userId } = req.body;

    const filter = {};

    if (productText) {
      filter.name = { $regex: new RegExp(productText), $options: "i" };
    }

    if (userId) {
      Object.assign(filter, { userId });
    }

    const { limit, offset } = getPagination(page, size);

    Order.paginate(filter, { offset, limit })
      .then(async (data) => {
        const { totalDocs, docs, totalPages, page } = data || {};
        const listOrder = docs.map(async (item) => {
          const dataUser = await User.findById(item.userId);
          const dataCart = await Cart.findById(item.cartId);
          return {
            ...item,
            userId: dataUser,
            cartId: dataCart,
          };
        });
        const resolvedPromises = await Promise.all(listOrder);
        const resultData = resolvedPromises.map((item) => {
          const { _doc, userId, cartId } = item || {};
          return {
            ..._doc,
            userId,
            cartId,
          };
        });
        res.json({
          retCode: 0,
          retText: "List order",
          retData: {
            totalItems: totalDocs,
            orders: resultData,
            totalPages: totalPages,
            currentPage: page - 1,
          },
        });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message,
        });
      });
  }
}

module.exports = new OrderController();
