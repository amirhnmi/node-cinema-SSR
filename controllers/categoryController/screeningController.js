const Controller = require("../controller")
const {validationResult}= require("express-validator")
const mongoose = require("mongoose");

const Screening = require("../../models/categories/categorie/screening");

class ScreeningController extends Controller{
    async getScreening(req,res,next){
        try {
            const screening_movies = await Screening.find({})
            res.render("adminDashboard/screeningForm/screeningCreateForm.ejs", {screenings:screening_movies})
        } catch (err) {
            next(err)
        }
        
    }

    async getOneScreening(req,res,next){
        try {
            if(!mongoose.Types.ObjectId.isValid(req.params.id)){
                req.flash("errors","آیدی نامعتبر است")
            }
            const screening_movie = await Screening.findById(req.params.id)
    
            if(!screening_movie){
                req.flash("errors","فیلمی با این آی دی یافت نشد")
            }
    
            res.render("adminDashboard/screeningForm/screeningUpdateForm.ejs", {screening:screening_movie})
        } catch (err) {
            next(err)
        }
        

    }

    async createScreening(req,res,next){
        try {
            const { movie_name, title, description, image, director, actors, producer, production_date, release_date } = req.body;
            let newscreening_movie= await new Screening({
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
                newscreening_movie.image = req.file.path.replace(/\\/g,"/").substring(6)
               }
            newscreening_movie = await newscreening_movie.save()
            req.flash("message", "فیلم مورد نظر با موفقیت اضافه شد")
            return res.redirect("/admin/screening");
        } catch (err) {
            next(err)
        }
    }

    async updateScreening(req,res,next){
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
            const screening_movie=await Screening.findByIdAndUpdate(req.params.id, {$set : data},{new: true});
            
            if(!screening_movie){
                req.flash("errors","فیلمی با این آی دی یافت نشد")
            }
            req.flash("message", "فیلم مورد نظر با موفقیت به روزرسانی شد")
            res.redirect("/admin/screening")

        } catch (err) {
            next(err)
        }
        

    }

    async deleteScreening(req,res,next){
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            req.flash("errors","آیدی نامعتبر است")
        }
        try{
            await Screening.findByIdAndRemove(req.params.id)
            req.flash("message", "فیلم مورد نظر با موفقیت حذف شد")
            return res.redirect("/admin/screening")
        } catch(err) {
            next(err)
        } 
        

    }
}

module.exports = new ScreeningController