const Voucher = require("../models/Voucher");

class VoucherController {
  async createVoucher(req, res, next) {
    try {
      const voucher = new Voucher(req.body);
      const result = await voucher.save();
      res.json({
        retCode: 0,
        retText: "Create successfully",
        retData: result,
      });
    } catch (error) {
      res.status(500).send(error);
    }
  }

  getListVoucher(req, res, next) {
    const getPagination = (page, size) => {
      const limit = size ? +size : 0;
      const offset = page === 1 ? 0 : (page - 1) * limit;

      return { limit, offset };
    };

    const { page, size } = req.body;

    const { limit, offset } = getPagination(page, size);

    Voucher.paginate({}, { offset, limit })
      .then((data) => {
        res.json({
          retCode: 0,
          retText: "",
          retData: {
            totalItems: data.totalDocs,
            vouchers: data.docs,
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

  async getDetailVoucher(req, res, next) {
    try {
      const result = await Voucher.findById(req.params.id).exec();
      res.json({
        retCode: 0,
        retText: "Detail voucher",
        retData: result,
      });
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async updateVoucher(req, res, next) {
    try {
      const voucherDetail = await Voucher.findById(req.params.id).exec();
      voucherDetail.set(req.body);
      const result = await voucherDetail.save();
      res.json({
        retCode: 0,
        retText: "Update successfully!",
        retData: result,
      });
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async deleteVoucher(req, res, next) {
    try {
      const result = await Voucher.deleteOne({
        _id: req.params.id,
      }).exec();
      res.json({
        retCode: 0,
        retText: "Delete successfully",
        retData: result,
      });
    } catch (error) {
      res.status(500).send(error);
    }
  }
}

module.exports = new VoucherController();
