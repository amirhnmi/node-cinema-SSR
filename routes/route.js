const express = require("express")
const router = express.Router()

// start home router
const Screening = require("../models/categories/categorie/screening")
const Theater = require("../models/categories/categorie/theater")
const ArtAndExprience = require("../models/categories/categorie/artAndExprience")
const ComedyTheater = require("../models/categories/categorie/comedyTheater")
const ChildrensTheater = require("../models/categories/categorie/childrensTheater")

const News = require("../models/salestable & news/news")
const SalesTable = require("../models/salestable & news/salestable")

router.get("/",  async (req,res,next)=>{
    const screening_movies = await Screening.find({})
    const theater_movies = await Theater.find({})
    const artandexprience_movies = await ArtAndExprience.find({})
    const comedytheater_movies = await ComedyTheater.find({})
    const childrenstheater_movies = await ChildrensTheater.find({})

    const news = await News.find({})
    const salestables = await SalesTable.find({})
    res.render("home.ejs",
    {
        screenings:screening_movies,
        theaters:theater_movies,
        artandexpriences:artandexprience_movies,
        comedytheaters:comedytheater_movies,
        childrenstheaters:childrenstheater_movies,

        news:news,
        salestables:salestables,
    }
    )
})
// end of home router


// global router
router.use("/user", require("./users/user"))
router.use("/categories", require("./categories/categories.js"))
router.use("/news", require("./salestable&news/salestable&news"))
router.use("/salestable", require("./salestable&news/salestable&news"))

router.all("*", async(req,res,next)=>{
    try {
        let err = new Error("چنین صفحه ایی یافت نشد");
        err.status = 404;
        throw err;
    } catch (err) {
        next(err)
    }
})

module.exports= router;