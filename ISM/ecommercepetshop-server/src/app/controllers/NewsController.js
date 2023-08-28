const New = require("../models/News");

class NewsController {
  // CREATE NEWS
  async createNews(req, res, next) {
    try {
      const news = new New(req.body);
      const result = await news.save();
      res.json({
        retCode: 0,
        retText: "Create successfully",
        retData: result,
      });
    } catch (error) {
      res.status(500).send(error);
    }
  }

  // GET LIST NEWS
  async getListNews(req, res, next) {
    const getPagination = (page, size) => {
      const limit = size ? +size : 0;
      const offset = page === 1 ? 0 : (page - 1) * limit;

      return { limit, offset };
    };

    const { page, size } = req.body;

    const filter = {};

    const { limit, offset } = getPagination(page, size);

    New.paginate(filter, { offset, limit })
      .then((data) => {
        res.json({
          retCode: 0,
          retText: "List news",
          retData: {
            totalItems: data.totalDocs,
            news: data.docs,
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

  // GET DETAIL NEWS
  async getDetailNews(req, res, next) {
    try {
      const result = await New.findById(req.params.id).exec();
      res.json({
        retCode: 0,
        retText: "Successfully",
        retData: result,
      });
    } catch (error) {
      res.status(500).send(error);
    }
  }

  // UPDATE DETAIL NEWS
  async updateDetailNews(req, res, next) {
    try {
      const newsDetail = await New.findById(req.params.id).exec();
      newsDetail.set(req.body);
      const result = await newsDetail.save();
      res.json({
        retCode: 0,
        retText: "Update Successfully",
        retData: result,
      });
    } catch (error) {
      res.status(500).send(error);
    }
  }

  // DELETE DETAIL NEWS
  async deleteDetailNews(req, res, next) {
    try {
      const result = await New.deleteOne({
        _id: req.params.id,
      }).exec();
      res.json({
        retCode: 0,
        retText: "Delete Successfully",
        retData: result,
      });
    } catch (error) {
      res.status(500).send(error);
    }
  }
}

module.exports = new NewsController();
