const express = require("express")
const { route } = require("./label.routes")
const router = express.Router()
const ProductController = require('../app/controllers/product.controller')
const product_ctrl = new ProductController()
const loginCheck = require("../app/middleware/auth.middleware")
const { isAdmin, isSeller } = require("../app/middleware/rbac.middleware")
const uploader = require("../app/middleware/file-upload.middleware")

const setFileDestination = (req, res, next) => {
          req.dest = "/product"
          next()
}

router.route('/')
          .get(product_ctrl.getAllProduct)
          .post(loginCheck, isAdmin, setFileDestination, uploader.single('image'), product_ctrl.createProduct)



router.route("/:id")
          .get(product_ctrl.detailProductById)
          .put()
          .delete(product_ctrl.deleteProductById)


module.exports = router