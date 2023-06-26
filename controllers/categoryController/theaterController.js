const Controller = require("../controller")
const {validationResult}= require("express-validator")
const mongoose = require("mongoose");

const Theater = require("../../models/categories/categorie/theater");

class TheaterController extends Controller{
    async getTheater(req,res,next){
        try {
            const Theater_movies = await Theater.find({})
            res.render("adminDashboard/theaterForm/theaterCreateForm.ejs", {theaters:Theater_movies})
        } catch (err) {
            next(err)
        }
        
    }

    async getOneTheater(req,res,next){
        try {
            if(!mongoose.Types.ObjectId.isValid(req.params.id)){
                req.flash("errors","آیدی نامعتبر است")
            }
            const Theater_movie = await Theater.findById(req.params.id)
    
            if(!Theater_movie){
                req.flash("errors","فیلمی با این آی دی یافت نشد")
            }
    
            res.render("adminDashboard/theaterForm/theaterUpdateForm.ejs", {theater:Theater_movie})
        } catch (err) {
            next(err)
        }
        

    }

    async createTheater(req,res,next){
        try {
            const { movie_name, title, description, image, director, actors, producer, production_date, release_date } = req.body;
            let newTheater_movie= await new Theater({
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
                newTheater_movie.image = req.file.path.replace(/\\/g,"/").substring(6)
               }
            newTheater_movie = await newTheater_movie.save()
            req.flash("message", "فیلم مورد نظر با موفقیت اضافه شد")
            return res.redirect("/admin/Theater");
        } catch (err) {
            next(err)
        }
    }

    async updateTheater(req,res,next){
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
            const Theater_movie=await Theater.findByIdAndUpdate(req.params.id, {$set : data},{new: true});
            
            if(!Theater_movie){
                req.flash("errors","فیلمی با این آی دی یافت نشد")
            }
            req.flash("message", "فیلم مورد نظر با موفقیت به روزرسانی شد")
            res.redirect("/admin/Theater")

        } catch (err) {
            next(err)
        }
        

    }

    async deleteTheater(req,res,next){
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            req.flash("errors","آیدی نامعتبر است")
        }
        try{
            await Theater.findByIdAndRemove(req.params.id)
            req.flash("message", "فیلم مورد نظر با موفقیت حذف شد")
            return res.redirect("/admin/Theater")
        } catch(err) {
            next(err)
        } 
        

    }
}

module.exports = new TheaterController