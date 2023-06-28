const express = require("express")
const router = express.Router()

const AdminDashboardController = require("../../controllers/dashboardController/adminDashboardController")

// category
const ScreeningController = require("../../controllers/categoryController/screeningController")
const TheaterController = require("../../controllers/categoryController/theaterController")
const ArtAndExprienceController = require("../../controllers/categoryController/artAndExprienceController")
const ComedyTheaterController = require("../../controllers/categoryController/comedyTheaterController")
const ChildrensTheaterController = require("../../controllers/categoryController/childrensTheaterController")

// salestable and news
const SalesTableController = require("../../controllers/salestable&newsController/salesTableController")
const NewsController = require("../../controllers/salestable&newsController/newsController")

// image validator
const CategoryImageValidator = require("../../validators/categoryImageValidator")

// image upload
const ScreeningUploadImage = require("../../upload/screeningUploadImage")
const TheaterUploadImage = require("../../upload/theaterUploadImage")
const ComedyTheaterUploadImage = require("../../upload/comedyTheaterUploadImage")
const ChildrensTheaterUploadImage = require("../../upload/childrensTheaterUploadImage")
const ArtAndExprienceUploadImage = require("../../upload/artAndExprienceUploadImage ")
const SalesTableUploadImage = require("../../upload/salesTableUploadImage")
const NewsUploadImage = require("../../upload/newsUploadImage")

router.use((req,res,next)=>{
    if(req.isAuthenticated() && req.user.is_admin === true){
        console.log(req.user.is_admin)
        return next()
    }
    res.redirect("/")
})
router.get("/", AdminDashboardController.dashboard)

// screening------------------
router.get("/screening", ScreeningController.getScreening)
router.get("/screening/:id", ScreeningController.getOneScreening)
router.post("/screening/create", ScreeningUploadImage.single("image"), (req,res,next)=>{
    if(!req.file) {
      req.body.image= null
    }else{
      req.body.image = req.file.filename;
    }
    next();},CategoryImageValidator.validate() ,ScreeningController.createScreening)
router.put("/screening/update/:id", ScreeningUploadImage.single("image"), (req,res,next)=>{
    if(!req.file) {
      req.body.image= null
    }else{
      req.body.image = req.file.filename;
    }
    next();} ,CategoryImageValidator.validate(),ScreeningController.updateScreening)
router.delete("/screening/delete/:id", ScreeningController.deleteScreening)

// theater --------------
router.get("/theater", TheaterController.getTheater)
router.get("/theater/:id", TheaterController.getOneTheater)
router.post("/theater/create" , TheaterUploadImage.single("image"), (req,res,next)=>{
    if(!req.file) {
      req.body.image= null
    }else{
      req.body.image = req.file.filename;
    }
    next();},CategoryImageValidator.validate(),TheaterController.createTheater)
router.put("/theater/update/:id" , TheaterUploadImage.single("image"), (req,res,next)=>{
    if(!req.file) {
      req.body.image= null
    }else{
      req.body.image = req.file.filename;
    }
    next();},CategoryImageValidator.validate(),TheaterController.updateTheater)
router.delete("/theater/delete/:id", TheaterController.deleteTheater)

// artandexprience-----------------
router.get("/artandexprience/", ArtAndExprienceController.getArtAndExprience)
router.get("/artandexprience/:id", ArtAndExprienceController.getOneArtAndExprience)
router.post("/artandexprience/create" , ArtAndExprienceUploadImage.single("image"), (req,res,next)=>{
    if(!req.file) {
      req.body.image= null
    }else{
      req.body.image = req.file.filename;
    }
    next();},CategoryImageValidator.validate(),ArtAndExprienceController.createArtAndExprience)
router.put("/artandexprience/update/:id" , ArtAndExprienceUploadImage.single("image"), (req,res,next)=>{
    if(!req.file) {
      req.body.image= null
    }else{
      req.body.image = req.file.filename;
    }
    next();},CategoryImageValidator.validate(),ArtAndExprienceController.updateArtAndExprience)
router.delete("/artandexprience/delete/:id", ArtAndExprienceController.deleteArtAndExprience)

// comedytheater-----------------
router.get("/comedytheater/", ComedyTheaterController.getComedyTheater)
router.get("/comedytheater/:id", ComedyTheaterController.getOneComedyTheater)
router.post("/comedytheater/create" , ComedyTheaterUploadImage.single("image"), (req,res,next)=>{
    if(!req.file) {
      req.body.image= null
    }else{
      req.body.image = req.file.filename;
    }
    next();},CategoryImageValidator.validate(),ComedyTheaterController.createComedyTheater)
router.put("/comedytheater/update/:id" , ComedyTheaterUploadImage.single("image"), (req,res,next)=>{
    if(!req.file) {
      req.body.image= null
    }else{
      req.body.image = req.file.filename;
    }
    next();},CategoryImageValidator.validate(),ComedyTheaterController.updateComedyTheater)
router.delete("/comedytheater/delete/:id", ComedyTheaterController.deleteComedyTheater)

// childrenstheater---------------
router.get("/childrenstheater/", ChildrensTheaterController.getChildrensTheater)
router.get("/childrenstheater/:id", ChildrensTheaterController.getOneChildrensTheater)
router.post("/childrenstheater/create" , ChildrensTheaterUploadImage.single("image"), (req,res,next)=>{
    if(!req.file) {
      req.body.image= null
    }else{
      req.body.image = req.file.filename;
    }
    next();},CategoryImageValidator.validate(),ChildrensTheaterController.createChildrensTheater)
router.put("/childrenstheater/update/:id" , ChildrensTheaterUploadImage.single("image"), (req,res,next)=>{
    if(!req.file) {
      req.body.image= null
    }else{
      req.body.image = req.file.filename;
    }
    next();},CategoryImageValidator.validate(),ChildrensTheaterController.updateChildrensTheater)
router.delete("/childrenstheater/delete/:id", ChildrensTheaterController.deleteChildrensTheater)

// sales table-----------
router.get("/salestable/", SalesTableController.getSalesTable)
router.get("/salestable/:id", SalesTableController.getOneSalesTable)
router.post("/salestable/create" , SalesTableUploadImage.single("image"), (req,res,next)=>{
    if(!req.file) {
      req.body.image= null
    }else{
      req.body.image = req.file.filename;
    }
    next();},CategoryImageValidator.validate(),SalesTableController.createSalesTable)
router.put("/salestable/update/:id" , SalesTableUploadImage.single("image"), (req,res,next)=>{
    if(!req.file) {
      req.body.image= null
    }else{
      req.body.image = req.file.filename;
    }
    next();},CategoryImageValidator.validate(),SalesTableController.updateSalesTable)
router.delete("/salestable/delete/:id", SalesTableController.deleteSalesTable)

// news-----------
router.get("/news/", NewsController.getNews)
router.get("/news/:id", NewsController.getOneNews)
router.post("/news/create" , NewsUploadImage.single("image"), (req,res,next)=>{
    if(!req.file) {
      req.body.image= null
    }else{
      req.body.image = req.file.filename;
    }
    next();},CategoryImageValidator.validate(),NewsController.createNews)
router.put("/news/update/:id" , NewsUploadImage.single("image"), (req,res,next)=>{
    if(!req.file) {
      req.body.image= null
    }else{
      req.body.image = req.file.filename;
    }
    next();},CategoryImageValidator.validate(),NewsController.updateNews)
router.delete("/news/delete/:id", NewsController.deleteNews)
module.exports = router