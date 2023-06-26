const Controller = require("../controller")
const {validationResult}= require("express-validator")
const mongoose = require("mongoose");

const ChildrensTheater = require("../../models/categories/categorie/childrensTheater");

class ChildrensTheaterController extends Controller{
    async getChildrensTheater(req,res,next){
        try {
            const ChildrensTheater_movies = await ChildrensTheater.find({})
            res.render("adminDashboard/childrensTheaterForm/childrensTheaterCreateForm.ejs", {childrensTheaters:ChildrensTheater_movies})
        } catch (err) {
            next(err)
        }
        
    }

    async getOneChildrensTheater(req,res,next){
        try {
            if(!mongoose.Types.ObjectId.isValid(req.params.id)){
                req.flash("errors","آیدی نامعتبر است")
            }
            const ChildrensTheater_movie = await ChildrensTheater.findById(req.params.id)
    
            if(!ChildrensTheater_movie){
                req.flash("errors","فیلمی با این آی دی یافت نشد")
            }
    
            res.render("adminDashboard/childrensTheaterForm/childrensTheaterUpdateForm.ejs", {childrensTheater:ChildrensTheater_movie})
        } catch (err) {
            next(err)
        }
        

    }

    async createChildrensTheater(req,res,next){
        try {
            const { movie_name, title, description, image, director, actors, producer, production_date, release_date } = req.body;
            let newChildrensTheater_movie= await new ChildrensTheater({
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
                newChildrensTheater_movie.image = req.file.path.replace(/\\/g,"/").substring(6)
               }
            newChildrensTheater_movie = await newChildrensTheater_movie.save()
            req.flash("message", "فیلم مورد نظر با موفقیت اضافه شد")
            return res.redirect("/admin/ChildrensTheater");
        } catch (err) {
            next(err)
        }
    }

    async updateChildrensTheater(req,res,next){
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
            const ChildrensTheater_movie=await ChildrensTheater.findByIdAndUpdate(req.params.id, {$set : data},{new: true});
            
            if(!ChildrensTheater_movie){
                req.flash("errors","فیلمی با این آی دی یافت نشد")
            }
            req.flash("message", "فیلم مورد نظر با موفقیت به روزرسانی شد")
            res.redirect("/admin/ChildrensTheater")

        } catch (err) {
            next(err)
        }
        

    }

    async deleteChildrensTheater(req,res,next){
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            req.flash("errors","آیدی نامعتبر است")
        }
        try{
            await ChildrensTheater.findByIdAndRemove(req.params.id)
            req.flash("message", "فیلم مورد نظر با موفقیت حذف شد")
            return res.redirect("/admin/ChildrensTheater")
        } catch(err) {
            next(err)
        } 
        

    }
}

module.exports = new ChildrensTheaterController