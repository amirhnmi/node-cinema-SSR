const express = require("express")
const router = express.Router()

const AdminDashboardController = require("../../controllers/dashboardController/adminDashboardController")

// category
const ScreeningController = require("../../controllers/categoryController/screeningController")
const TheaterController = require("../../controllers/categoryController/theaterController")
const ArtAndExprienceController = require("../../controllers/categoryController/artAndExprienceController")
const ComedyTheaterController = require("../../controllers/categoryController/comedyTheaterController")
const ChildrensTheaterController = require("../../controllers/categoryController/childrensTheaterController")

const UploadScreeningImage = require("../../upload/uploadScreeningImage")
const CategoryImageValidator = require("../../validators/categoryImageValidator")


router.use((req,res,next)=>{
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect("/")
})
router.get("/", AdminDashboardController.dashboard)

// screening
router.get("/screening", ScreeningController.getScreening)
router.get("/screening/:id", ScreeningController.getOneScreening)
router.post("/screening/create", UploadScreeningImage.single("image"), (req,res,next)=>{
    if(!req.file) {
      req.body.image= null
    }else{
      req.body.image = req.file.filename;
    }
    next();},CategoryImageValidator.validate() ,ScreeningController.createScreening)
router.put("/screening/update/:id", UploadScreeningImage.single("image"), (req,res,next)=>{
    if(!req.file) {
      req.body.image= null
    }else{
      req.body.image = req.file.filename;
    }
    next();} ,CategoryImageValidator.validate(),ScreeningController.updateScreening)
router.delete("/screening/delete/:id", ScreeningController.deleteScreening)

// theater
router.get("/theater", TheaterController.getTheater)
router.get("/theater/:id", TheaterController.getOneTheater)
router.post("/theater/create" ,TheaterController.createTheater)
router.put("/theater/update/:id" ,TheaterController.updateTheater)
router.delete("/theater/delete/:id", TheaterController.deleteTheater)

// artandexprience
router.get("/artandexprience/", ArtAndExprienceController.getArtAndExprience)
router.get("/artandexprience/:id", ArtAndExprienceController.getOneArtAndExprience)
router.post("/artandexprience/create" ,ArtAndExprienceController.createArtAndExprience)
router.put("/artandexprience/update/:id" ,ArtAndExprienceController.updateArtAndExprience)
router.delete("/artandexprience/delete/:id", ArtAndExprienceController.deleteArtAndExprience)

// comedytheater
router.get("/comedytheater/", ComedyTheaterController.getComedyTheater)
router.get("/comedytheater/:id", ComedyTheaterController.getOneComedyTheater)
router.post("/comedytheater/create" ,ComedyTheaterController.createComedyTheater)
router.put("/comedytheater/update/:id" ,ComedyTheaterController.updateComedyTheater)
router.delete("/comedytheater/delete/:id", ComedyTheaterController.deleteComedyTheater)

// childrenstheater
router.get("/childrenstheater/", ChildrensTheaterController.getChildrensTheater)
router.get("/childrenstheater/:id", ChildrensTheaterController.getOneChildrensTheater)
router.post("/childrenstheater/create" ,ChildrensTheaterController.createChildrensTheater)
router.put("/childrenstheater/update/:id" ,ChildrensTheaterController.updateChildrensTheater)
router.delete("/childrenstheater/delete/:id", ChildrensTheaterController.deleteChildrensTheater)


module.exports = router