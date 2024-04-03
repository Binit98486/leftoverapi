const router = require("express").Router();

const isLogin = require("../app/middleware/auth.middleware");
const { isAdmin } = require("../app/middleware/rbac.middleware");
const uploader = require("../app/middleware/file-upload.middleware");
const CategoryController = require("../app/controllers/category.controller");
const category_ctrl = new CategoryController();
const setDestination = (req, res, next) => {
  req.dest = "/category";
  next();
};
console.log("2");

router
  .route("/")
  .get(category_ctrl.getAllCategory)
  .post(
    isLogin,
    isAdmin,
    setDestination,
    uploader.single("image"),
    category_ctrl.createCategory
  );

router
  .route("/:id")
  .get(category_ctrl.getCategoryById)
  .put(
    isLogin,
    isAdmin,
    setDestination,
    uploader.single("image"),
    category_ctrl.updateCategory
  )
  .delete(category_ctrl.deleteCategory);

module.exports = router;
