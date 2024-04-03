const ProductModel = require("../models/product.model")
const ProcuctModel = require("../models/product.model")
class ProductController {


          createProduct = async (req, res, next) => {
                    let data = req.body
                    if (req.file) {
                              data.image = req.file.filename
                    }
                    try {
                              let product = new ProductModel(data)
                              let ack = await product.save()
                              res.json({
                                        status: true,
                                        msg: "Product created successfully",
                                        result: product
                              })


                    } catch (error) {
                              next({
                                        status: 400,
                                        msg: error
                              })

                    }

          }
          getAllProduct = async (req, res, next) => {

                    try {
                              let query = {}

                              const product = await ProcuctModel.find()
                              res.json({
                                        result: product,
                                        msg: "Product fetched successfully",
                                        status: true
                              })

                    } catch (error) {
                              next({
                                        msg: error,
                                        status: 400
                              })

                    }
          }
          deleteProductById = async (req, res, next) => {
                    try {

                              let id = await ProcuctModel.findById(req.params.id)
                              if (id) {
                                        let product = await ProcuctModel.findByIdAndDelete(id)
                                        res.json({
                                                  result: product,
                                                  msg: "Delete Successfully.",
                                                  status: true
                                        })
                              } else {
                                        next({
                                                  status: 400,
                                                  msg: "Product doesn't exist."
                                        })
                              }



                    } catch (error) {
                              next({
                                        result: null,
                                        msg: error,
                                        status: 400
                              })

                    }

          }
          detailProductById = async (req, res, next) => {
                    try {
                              let id = await ProcuctModel.findById(req.params.id)
                              if (id) {
                                        let product = await ProcuctModel.findById(req.params.id)
                                        res.json({
                                                  result: product,
                                                  msg: "success",
                                                  status: true
                                        })
                              }

                    } catch (error) {
                              next({
                                        result: null,
                                        msg: error,
                                        stauts: 400
                              })

                    }
          }

}


module.exports = ProductController