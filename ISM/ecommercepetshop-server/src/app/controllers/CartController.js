const Cart = require("../models/Cart");
const Product = require("../models/Product");

const getData = () => {};

class CartController {
  // Create cart [POST]
  async createCart(req, res, next) {
    const { userId, cartProduct } = req.body;
    const cartDetail = await Cart.findOne({
      userId,
    });

    const getPrice = (arrayPrice) => {
      return (
        arrayPrice
          .map((item) => {
            return item.totalPrice;
          })
          .reduce((total, currentValue) => {
            return total + currentValue;
          }) ?? 0
      );
    };

    const getItems = (arrayItem) => {
      return (
        arrayItem
          .map((item) => {
            return item.totalItem;
          })
          .reduce((total, currentValue) => {
            return total + currentValue;
          }) ?? 0
      );
    };

    try {
      if (!!cartDetail) {
        const checkExistProduct = cartDetail.listCart.find(
          (item) => item._id === cartProduct._id
        );
        if (!!checkExistProduct) {
          const updatePriceAndItem = cartDetail?.listCart?.map((item) => {
            if (item?._id === cartProduct?._id) {
              return {
                ...item,
                totalPrice: item?.totalPrice + cartProduct?.totalPrice,
                totalItem: item?.totalItem + cartProduct?.totalItem,
              };
            }
            return item;
          });

          const prirceDuplicate = getPrice(updatePriceAndItem);
          const itemDuplicate = getItems(updatePriceAndItem);

          const payloadDup = {
            userId: userId,
            totalPrice: prirceDuplicate,
            totalProduct: itemDuplicate,
            listCart: updatePriceAndItem,
          };

          cartDetail.set(payloadDup);

          const duplicateCart = await cartDetail.save();

          res.json({
            retCode: 0,
            retText: "Successfully duplicate",
            retData: duplicateCart,
          });
        } else {
          const listProduct = cartDetail._doc.listCart;
          const promises = listProduct.map(async (item) => {
            try {
              const data = await Product.findById(item?._id).exec();
              return {
                ...data._doc,
                totalItem: item?.totalItem,
                totalPrice: item?.totalPrice,
              };
            } catch (err) {
              console.log("err", err);
            }
          });
          const resolvedPromises = await Promise.all(promises);
          const resultData = {
            ...cartDetail._doc,
            listCart: resolvedPromises,
          };

          const calculateTotalPrice = getPrice(resultData.listCart);
          const calculateTotalItem = getItems(resultData.listCart);

          const payloadReqExit = {
            userId: userId,
            totalPrice: calculateTotalPrice + cartProduct.totalPrice,
            totalProduct: calculateTotalItem + cartProduct.totalItem,
            listCart: [
              ...cartDetail.listCart,
              {
                _id: cartProduct?._id,
                totalPrice: cartProduct.totalPrice,
                totalItem: cartProduct.totalItem,
              },
            ],
          };

          cartDetail.set(payloadReqExit);

          const updateCart = await cartDetail.save();

          res.json({
            retCode: 0,
            retText: "Successfully update",
            retData: updateCart,
          });
        }
      } else {
        const payloadReqNotExit = {
          userId: userId,
          totalPrice: cartProduct.totalPrice,
          totalProduct: cartProduct.totalItem,
          listCart: [
            {
              _id: cartProduct?._id,
              totalPrice: cartProduct.totalPrice,
              totalItem: cartProduct.totalItem,
            },
          ],
        };

        const cart = new Cart(payloadReqNotExit);

        const createCart = await cart.save();

        res.json({
          retCode: 0,
          retText: "Successfully create",
          retData: createCart,
        });
      }
    } catch (err) {
      res.status(500).send(err);
    }
  }

  async getCart(req, res, next) {
    try {
      const { userId } = req.body;
      const cartDetail = await Cart.findOne({
        userId,
      });

      const listProduct = cartDetail._doc.listCart;
      const promises = listProduct.map(async (item) => {
        try {
          const data = await Product.findById(item?._id).exec();
          return {
            ...data._doc,
            totalItem: item?.totalItem,
            totalPrice: item?.totalPrice,
          };
        } catch (err) {
          console.log("err", err);
        }
      });
      const resolvedPromises = await Promise.all(promises);
      const resultData = {
        ...cartDetail._doc,
        listCart: resolvedPromises,
      };

      if (!!cartDetail) {
        res.json({
          retCode: 0,
          retText: "Successfully",
          retData: resultData,
        });
      } else {
        res.json({
          retCode: 0,
          retText: "Unsuccessfully",
          retData: null,
        });
      }
    } catch (err) {
      res.status(500).send(err);
    }
  }

  async deleteItemCart(req, res, next) {
    const { userId, cartProduct } = req.body;
    const cartDetail = await Cart.findOne({
      userId,
    });
    const { listCart } = cartDetail || {};

    let list = [];
    const findItemIndex = listCart.findIndex(
      (item) => item._id === cartProduct._id
    );

    if (listCart[findItemIndex].totalItem === 1) {
      const test = listCart.filter((item) => item._id !== cartProduct._id);
      test.forEach((item) => {
        list.push(item);
      });
    } else {
      listCart.forEach((item) => {
        if (item?._id === cartProduct?._id) {
          return list.push({
            ...item,
            totalPrice: item?.totalPrice - cartProduct?.totalPrice,
            totalItem: item?.totalItem - cartProduct?.totalItem,
          });
        }
        return list.push(item);
      });
    }

    const getPrice = (arrayPrice) => {
      return (
        arrayPrice
          .map((item) => {
            return item.totalPrice;
          })
          .reduce((total, currentValue) => {
            return total + currentValue;
          }) ?? 0
      );
    };

    const getItems = (arrayItem) => {
      return (
        arrayItem
          .map((item) => {
            return item.totalItem;
          })
          .reduce((total, currentValue) => {
            return total + currentValue;
          }) ?? 0
      );
    };

    const calTotalPrice = getPrice(list);
    const calTotalItem = getItems(list);

    const payloadDelete = {
      userId,
      totalPrice: calTotalPrice,
      totalProduct: calTotalItem,
      listCart: list,
    };

    try {
      cartDetail.set(payloadDelete);

      const deleteItemInCart = await cartDetail.save();

      res.json({
        retCode: 0,
        retText: "Successfully delete",
        retData: deleteItemInCart,
      });
    } catch (err) {
      res.status(500).send(err);
    }
  }

  async checkCartExist(req, res, next) {
    const { userId } = req.body;
    try {
      const data = await Cart.findOne({ userId });
      if (!!data) {
        res.json({
          retCode: 0,
          retText: "Users have already cart exist",
          retData: true,
        });
      } else {
        res.json({
          retCode: 1,
          retText: "Users have not already cart exist",
          retData: false,
        });
      }
    } catch (err) {
      res.status(500).send(err);
    }
  }
}

module.exports = new CartController();
