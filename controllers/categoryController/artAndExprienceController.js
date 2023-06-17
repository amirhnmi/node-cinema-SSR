const Controller = require("../controller")
const {validationResult}= require("express-validator")
const mongoose = require("mongoose");

const ArtAndExprience = require("../../models/categories/categorie/artAndExprience");

class ArtAndExprienceController extends Controller{
    async getArtAndExprience(req,res){
        try {
            const ArtAndExprience_movies = await ArtAndExprience.find({})
            res.render("home.ejs", {artandexprience:ArtAndExprience_movies})
        } catch (err) {
            next(err)
        }
        
    }

    async getOneArtAndExprience(req,res){
        try {
            if(!mongoose.Types.ObjectId.isValid(req.params.id)){
                throw new Error("آیدی نامعتبر است")
            }
            const ArtAndExprience_movie = await ArtAndExprience.findById(req.params.id)
    
            if(!ArtAndExprience_movie){
                throw new Error("فیلمی با این آی دی یافت نشد")
            }
    
            res.render("categories/screening.ejs", {artandexprience:ArtAndExprience_movie})
        } catch (err) {
            next(err)
        }
        

    }

    async createArtAndExprience(req,res){
        try {
            const { movie_name, title, description, image, director, actors, producer, production_date, release_date } = req.body;
            let newArtAndExprience_movie= await ArtAndExprience({
            movie_name,
            title,
            description,
            image,
            director,
            actors,
            producer,
            production_date,
            release_date
        })

        newArtAndExprience_movie = await newArtAndExprience_movie.save()

        } catch (err) {
            next(err)
        }
        

    }

    async updateArtAndExprience(req,res){
        try {
            if(!mongoose.Types.ObjectId.isValid(req.params.id)){
                throw new Error("آیدی نامعتبر است")
            }
    
            const { movie_name, title, description, image, director, actors, producer, production_date, release_date } = req.body
            const ArtAndExprience_movie=await ArtAndExprience.findByIdAndUpdate(req.params.id, {
                movie_name,
                title,
                description,
                image,
                director,
                actors,
                producer,
                production_date,
                release_date,
            },{new: true});
    
            if(!ArtAndExprience_movie){
                throw new Error("فیلمی با این آی دی یافت نشد")
            }

        } catch (err) {
            next(err)
        }
        

    }

    async deleteArtAndExprience(req,res){
        try {
            if(!mongoose.Types.ObjectId.isValid(req.params.id)){
                throw new Error("آیدی نامعتبر است")
            }
    
            const ArtAndExprience_movie = await ArtAndExprience.findByIdAndRemove(req.params.id)
    
            if(!ArtAndExprience_movie){
                throw new Error("فیلمی با این آی دی یافت نشد")
            }

        } catch (err) {
            next(err)
        }
        

    }
}

module.exports = new ArtAndExprienceController