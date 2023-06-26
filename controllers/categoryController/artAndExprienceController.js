const Controller = require("../controller")
const {validationResult}= require("express-validator")
const mongoose = require("mongoose");

const ArtAndExprience = require("../../models/categories/categorie/artAndExprience");

class ArtAndExprienceController extends Controller{
    async getArtAndExprience(req,res,next){
        try {
            const ArtAndExprience_movies = await ArtAndExprience.find({})
            res.render("adminDashboard/artAndExprienceForm/artAndExprienceCreateForm.ejs", {artAndExpriences:ArtAndExprience_movies})
        } catch (err) {
            next(err)
        }
        
    }

    async getOneArtAndExprience(req,res,next){
        try {
            if(!mongoose.Types.ObjectId.isValid(req.params.id)){
                req.flash("errors","آیدی نامعتبر است")
            }
            const ArtAndExprience_movie = await ArtAndExprience.findById(req.params.id)
    
            if(!ArtAndExprience_movie){
                req.flash("errors","فیلمی با این آی دی یافت نشد")
            }
    
            res.render("adminDashboard/artAndExprienceForm/artAndExprienceUpdateForm.ejs", {artAndExprience:ArtAndExprience_movie})
        } catch (err) {
            next(err)
        }
        

    }

    async createArtAndExprience(req,res,next){
        try {
            const { movie_name, title, description, image, director, actors, producer, production_date, release_date } = req.body;
            let newArtAndExprience_movie= await new ArtAndExprience({
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
                newArtAndExprience_movie.image = req.file.path.replace(/\\/g,"/").substring(6)
               }
            newArtAndExprience_movie = await newArtAndExprience_movie.save()
            req.flash("message", "فیلم مورد نظر با موفقیت اضافه شد")
            return res.redirect("/admin/ArtAndExprience");
        } catch (err) {
            next(err)
        }
    }

    async updateArtAndExprience(req,res,next){
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
            const ArtAndExprience_movie=await ArtAndExprience.findByIdAndUpdate(req.params.id, {$set : data},{new: true});
            
            if(!ArtAndExprience_movie){
                req.flash("errors","فیلمی با این آی دی یافت نشد")
            }
            req.flash("message", "فیلم مورد نظر با موفقیت به روزرسانی شد")
            res.redirect("/admin/ArtAndExprience")

        } catch (err) {
            next(err)
        }
        

    }

    async deleteArtAndExprience(req,res,next){
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            req.flash("errors","آیدی نامعتبر است")
        }
        try{
            await ArtAndExprience.findByIdAndRemove(req.params.id)
            req.flash("message", "فیلم مورد نظر با موفقیت حذف شد")
            return res.redirect("/admin/ArtAndExprience")
        } catch(err) {
            next(err)
        } 
        

    }
}

module.exports = new ArtAndExprienceController