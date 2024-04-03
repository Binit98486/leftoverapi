class CategoryService {
          validateCategoryData = (data) => {
                    let err_msg = {}
                    if (!data.title) {
                              err_msg.title = "Title is required"
                    }
                    if (!data.status) {
                              err_msg.status = "Status is required"
                    }
                    if (Object.keys(err_msg).length > 0) {
                              throw ({ status: 400, msg: err_msg })
                    } else {
                              return null
                    }
          }

}

module.exports = CategoryService