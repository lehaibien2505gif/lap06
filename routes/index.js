var express = require('express');
const {Router} = require("express");
var router = express.Router();
const multer  = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.mimetype == 'image/jpeg'){
      cb(null,'uploads/');
    }
    cb(new Error("Chỉ được Upload File JPG"), false)
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, Date.now() + '-' + file.originalname);
  },
});

var upload2 = multer({storage: storage ,
  limits: {
    files: 5,
    fileSize: 2 * 1024 * 1024 ,}} ).array('avatar');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {message:''});
});

router.post('/',function (req, res, next){
  upload2(req, res, function (err){
    if (err instanceof multer.MulterError){
      res.send("File tối thiểu 2MB hoặc upload không được quá 5 file hoặc file không phải jpg");
      return;
    }else{
      res.send("Upload thanh cong");
    }
  })
});

module.exports = router;
