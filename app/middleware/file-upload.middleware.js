
const multer = require('multer');
const { makeDirectory } = require('../../config/functions');

const myStorage = multer.diskStorage({
          destination: (req, file, cb) => {
                    makeDirectory(req.dest)
                    let path = process.cwd() + "/uploads/" + req.dest;
                    console.log(path, "this is path");
                    cb(null, path)
          },
          filename: (req, file, cb) => {
                    let date = Date.now()
                    let file_name = date + "-" + file.originalname
                    cb(null, file_name)

          }
})
const imageFilter = (req, file, cb) => {
          let allowed_images = ['jpg', 'jpeg', 'png', 'psd']
          let upload_ext = file.originalname.split('.')
          upload_ext = upload_ext[upload_ext.length - 1]
          if (upload_ext && allowed_images.includes(upload_ext.toLowerCase())) {
                    cb(null, true)

          } else {
                    cb({
                              status: 400,
                              msg: "Unsupported Image file"
                    }, false)
          }

}
const uploader = multer({
          storage: myStorage,
          fileFilter: imageFilter,
          limits: {
                    fieldSize: 1024
          }
})



module.exports = uploader