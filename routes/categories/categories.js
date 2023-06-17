const express = require("express")
const router = express.Router()

// controller
const ScreeningController = require("../../controllers/categoryController/screeningController")
const TheaterController = require("../../controllers/categoryController/theaterController")
const ArtAndExprienceController = require("../../controllers/categoryController/artAndExprienceController")
const ComedyTheaterController = require("../../controllers/categoryController/comedyTheaterController")
const ChildrensTheaterController = require("../../controllers/categoryController/childrensTheaterController")


//validator
const categoryValidator = require("../../validators/userValidator")



// screening
router.get("/screenig", ScreeningController.getScreening)
router.get("/screenig/:id", ScreeningController.getOneScreening)
router.post("/screenig/create", categoryValidator.validate() ,ScreeningController.createScreening)
router.put("/screenig/update/:id", categoryValidator.validate() ,ScreeningController.updateScreening)
router.delete("/screenig/delete/:id", ScreeningController.deleteScreening)

// theater
router.get("/theater/", TheaterController.getTheater)
router.get("/theater/:id", TheaterController.getOneTheater)
router.post("/theater/create", categoryValidator.validate() ,TheaterController.createTheater)
router.put("/theater/update/:id", categoryValidator.validate() ,TheaterController.updateTheater)
router.delete("/theater/delete/:id", TheaterController.deleteTheater)

// artandexprience
router.get("/artandexprience/", ArtAndExprienceController.getArtAndExprience)
router.get("/artandexprience/:id", ArtAndExprienceController.getOneArtAndExprience)
router.post("/artandexprience/create", categoryValidator.validate() ,ArtAndExprienceController.createArtAndExprience)
router.put("/artandexprience/update/:id", categoryValidator.validate() ,ArtAndExprienceController.updateArtAndExprience)
router.delete("/artandexprience/delete/:id", ArtAndExprienceController.deleteArtAndExprience)

// comedytheater
router.get("/comedytheater/", ComedyTheaterController.getComedyTheater)
router.get("/comedytheater/:id", ComedyTheaterController.getOneComedyTheater)
router.post("/comedytheater/create", categoryValidator.validate() ,ComedyTheaterController.createComedyTheater)
router.put("/comedytheater/update/:id", categoryValidator.validate() ,ComedyTheaterController.updateComedyTheater)
router.delete("/comedytheater/delete/:id", ComedyTheaterController.deleteComedyTheater)

// childrenstheater
router.get("/childrenstheater/", ChildrensTheaterController.getChildrensTheater)
router.get("/childrenstheater/:id", ChildrensTheaterController.getOneChildrensTheater)
router.post("/childrenstheater/create", categoryValidator.validate() ,ChildrensTheaterController.createChildrensTheater)
router.put("/childrenstheater/update/:id", categoryValidator.validate() ,ChildrensTheaterController.updateChildrensTheater)
router.delete("/childrenstheater/delete/:id", ChildrensTheaterController.deleteChildrensTheater)

module.exports= router;