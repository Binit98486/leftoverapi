const CategoryModel = require("../models/category.model");
const CategoryService = require("../services/category.service");
const LabelService = require("../services/label.service");
class CategoryController {

  constructor() {
    console.log("3");
    this.cat_svc = new CategoryService();
    this.label_svc = new LabelService();
  }
  createCategory = async (req, res, next) => {
    console.log("cat");
    try {
      let data = req.body;
      if (req.file) {
        data.image = req.file.filename;
      }
      data.slug = this.label_svc.getSlug(data?.title);
      // if ((data.parent_id = null)) {
      //   data.parent_id = "null";
      // }
      console.log(data);
      this.cat_svc.validateCategoryData(data);
      let category = new CategoryModel(data);
      let ack = await category.save();

      res.json({
        result: ack,
        status: true,
        msg: "Category Created successfully",
      });
    } catch (error) {
      next({
        status: 400,
        msg: error,
        result: null,
      });
    }
  };
  getAllCategory = async (req, res, next) => {
    console.log("4");
    try {
      let filter = {};
      if (req.query.show_in_home) {
        filter = {
          show_in_home: true,
        };
      }
      console.log("5");
      let category = await CategoryModel.find(filter)

        .populate("parent_id")
        .populate("brands");
      console.log("6");

      res.json({
        result: category,
        msg: "Success",
        status: true,
      });
    } catch (error) {
      next({
        status: 400,
        msg: error,
      });
    }
  };

  updateCategory = async (req, res, next) => {
    try {
      let data = req.body;
      if (req.file) {
        data.image = req.file.filename;
      }
      data.slug = this.label_svc.getSlug(data?.title);
      if (!data.parent_id) {
        data.parent_id = null;
      }
      this.cat_svc.validateCategoryData(data);
      let ack = await CategoryModel.findByIdAndUpdate(req.params.id, {
        $set: data,
      });
      res.json({
        result: ack,
        status: true,
        msg: "Category Created successfully",
      });
    } catch (error) {
      next({
        status: 400,
        msg: error,
        result: null,
      });
    }
  };
  deleteCategory = async (req, res, next) => {
    try {
      let data = req.params.id;
      let ack = await CategoryModel.findByIdAndDelete(req.params.id);
      if (ack) {
        res.json({
          result: ack,
          status: true,
          msg: "Category deleted successfully",
        });
      } else {
        res.json({
          result: null,
          status: false,
          msg: "Category doesn't exit",
        });
      }
    } catch (error) {
      next({
        status: 400,
        msg: error,
        result: null,
      });
    }
  };
  getCategoryById = async (req, res, next) => {
    try {
      let ack = await CategoryModel.findById(req.params.id)
        .populate("category")
        .populate("Label");
      if (ack) {
        res.json({
          result: ack,
          status: true,
          msg: "success",
        });
      } else {
        res.json({
          result: null,
          status: false,
          msg: "Category doesn't exit",
        });
      }
    } catch (error) {
      next({
        status: 400,
        msg: error,
        result: null,
      });
    }
  };
}

module.exports = CategoryController;
