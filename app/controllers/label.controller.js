const LabelService = require("../services/label.service");
const LabelModel = require("../models/label.model");
class LabelController {
  constructor() {
    this.label_svc = new LabelService();
  }

  createLabel = async (req, res, next) => {
    let data = req.body;
    if (req.file) {
      data.image = req.file.filename;
    }
    try {
      let err_msg = this.label_svc.validateLabelData(data);
      if (err_msg) {
        next({
          status: 400,
          msg: err_msg,
        });
      } else {
        data.slug = this.label_svc.getSlug(data.title);
        let label = new LabelModel(data);
        let ack = await label.save();

        res.json({
          status: true,
          msg: "Label created succesfully",
          result: label,
        });
      }
    } catch (error) {
      next({
        status: 400,
        msg: error,
      });
    }
  };

  // listing labels
  getLabel = async (req, res, next) => {
    try {
      let filter = {};
      if (req.query.type) {
        filter: req.query.type;
      }
      let data = await LabelModel.find(filter);
      res.json({
        result: data,
        msg: "Label Fetched successfully ",
        status: true,
      });
    } catch (error) {
      next({
        result: error,
        status: 400,
      });
    }
  };
  getLabelById = async (req, res, next) => {
    try {
      let query = {};
      if (req.params.id) {
        query = req.params.id;
      }
      let data = await LabelModel.findById(query);
      res.json({
        result: data,
        msg: "success",
        status: true,
      });
    } catch (error) {
      next({
        msg: error,
        status: 500,
      });
    }
  };

  updateLabel = async (req, res, next) => {
    let data = req.body;
    if (req.file) {
      data.image = req.file.filename;
    }
    try {
      let err_msg = this.label_svc.validateLabelData(data, true);
      if (err_msg) {
        next({
          status: 400,
          msg: err_msg,
        });
      } else {
        data.slug = this.label_svc.getSlug(data.title);
        let ack = await LabelModel.findByIdAndUpdate(req.params.id, {
          $set: data,
        });

        res.json({
          status: true,
          msg: "Label updated succesfully",
          result: data,
        });
      }
    } catch (error) {
      next({
        status: 400,
        msg: error,
      });
    }
  };
  deleteLabelById = async (req, res, next) => {
    try {
      let id = await LabelModel.findById(req.params.id);
      if (id) {
        let data = await LabelModel.findByIdAndDelete(req.params.id);
        res.json({
          status: true,
          msg: "Label delete succesfully.",
          result: data,
        });
      } else {
        next({
          status: 400,
          msg: "Label not found.",
        });
      }
    } catch (error) {
      next({
        status: 400,
        msg: error,
      });
    }
  };
}

module.exports = LabelController;
