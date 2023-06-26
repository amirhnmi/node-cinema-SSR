const Controller = require("../controller")
const {validationResult}= require("express-validator")
const mongoose = require("mongoose");

const ComedyTheater = require("../../models/categories/categorie/comedyTheater");

class ComedyTheaterController extends Controller{
    async getComedyTheater(req,res,next){
        try {
            const ComedyTheater_movies = await ComedyTheater.find({})
            res.render("adminDashboard/comedyTheaterForm/comedyTheaterCreateForm.ejs", {comedyTheaters:ComedyTheater_movies})
        } catch (err) {
            next(err)
        }
        
    }

    async getOneComedyTheater(req,res,next){
        try {
            if(!mongoose.Types.ObjectId.isValid(req.params.id)){
                req.flash("errors","آیدی نامعتبر است")
            }
            const ComedyTheater_movie = await ComedyTheater.findById(req.params.id)
    
            if(!ComedyTheater_movie){
                req.flash("errors","فیلمی با این آی دی یافت نشد")
            }
    
            res.render("adminDashboard/comedyTheaterForm/comedyTheaterUpdateForm.ejs", {comedyTheater:ComedyTheater_movie})
        } catch (err) {
            next(err)
        }
        

    }

    async createComedyTheater(req,res,next){
        try {
            const { movie_name, title, description, image, director, actors, producer, production_date, release_date } = req.body;
            let newComedyTheater_movie= await new ComedyTheater({
            movie_name,
            title,
            description,
            image,
            director,
            actors,
            producer,
            production_date,
            release_date,
            })
            if(req.file){
                newComedyTheater_movie.image = req.file.path.replace(/\\/g,"/").substring(6)
               }
            newComedyTheater_movie = await newComedyTheater_movie.save()
            req.flash("message", "فیلم مورد نظر با موفقیت اضافه شد")
            return res.redirect("/admin/ComedyTheater");
        } catch (err) {
            next(err)
        }
    }

    async updateComedyTheater(req,res,next){
        try {
            if(!mongoose.Types.ObjectId.isValid(req.params.id)){
                req.flash("errors","آیدی نامعتبر است")
            }
                
            const { movie_name, title, description, image, director, actors, producer, production_date, release_date } = req.body

            let data = {
                movie_name,
                title,
                description,
                image,
                director,
                actors,
                producer,
                production_date,
                release_date,
            }
            if(req.file){
                data.image = req.file.path.replace(/\\/g,"/").substring(6)
               }
            const ComedyTheater_movie=await ComedyTheater.findByIdAndUpdate(req.params.id, {$set : data},{new: true});
            
            if(!ComedyTheater_movie){
                req.flash("errors","فیلمی با این آی دی یافت نشد")
            }
            req.flash("message", "فیلم مورد نظر با موفقیت به روزرسانی شد")
            res.redirect("/admin/ComedyTheater")

        } catch (err) {
            next(err)
        }
        

    }

    async deleteComedyTheater(req,res,next){
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            req.flash("errors","آیدی نامعتبر است")
        }
        try{
            await ComedyTheater.findByIdAndRemove(req.params.id)
            req.flash("message", "فیلم مورد نظر با موفقیت حذف شد")
            return res.redirect("/admin/ComedyTheater")
        } catch(err) {
            next(err)
        } 
        

    }
}

module.exports = new ComedyTheaterController