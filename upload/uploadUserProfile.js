const multer= require("multer");
const mkdir= require("mkdirp");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    mkdir('./public/uploads/avatars').then(made=>{
        cb(null, './public/uploads/avatars')
    })
    
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + '-' + Date.now())
  }
})

const upload = multer({ storage: storage })

module.exports= upload;