const Controller = require("../controller")
const {validationResult}= require("express-validator")
const mongoose = require("mongoose");

const Screening = require("../../models/categories/categorie/screening");

class ScreeningController extends Controller{
    async getScreening(req,res){
        try {
            const screening_movies = await Screening.find({})
            res.render("home.ejs", {screenings:screening_movies})
        } catch (err) {
            next(err)
        }
        
    }

    async getOneScreening(req,res){
        try {
            if(!mongoose.Types.ObjectId.isValid(req.params.id)){
                throw new Error("آیدی نامعتبر است")
            }
            const screening_movie = await Screening.findById(req.params.id)
    
            if(!screening_movie){
                throw new Error("فیلمی با این آی دی یافت نشد")
            }
    
            res.render("categories/screening.ejs", {screening:screening_movie})
        } catch (err) {
            next(err)
        }
        

    }

    async createScreening(req,res){
        try {
            const { movie_name, title, description, image, director, actors, producer, production_date, release_date } = req.body;
            let newscreening_movie= await Screening({
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

        newscreening_movie = await newscreening_movie.save()

        } catch (err) {
            next(err)
        }
        

    }

    async updateScreening(req,res){
        try {
            if(!mongoose.Types.ObjectId.isValid(req.params.id)){
                throw new Error("آیدی نامعتبر است")
            }
    
            const { movie_name, title, description, image, director, actors, producer, production_date, release_date } = req.body
            const screening_movie=await Screening.findByIdAndUpdate(req.params.id, {
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
    
            if(!screening_movie){
                throw new Error("فیلمی با این آی دی یافت نشد")
            }

        } catch (err) {
            next(err)
        }
        

    }

    async deleteScreening(req,res){
        try {
            if(!mongoose.Types.ObjectId.isValid(req.params.id)){
                throw new Error("آیدی نامعتبر است")
            }
    
            const screening_movie = await Screening.findByIdAndRemove(req.params.id)
    
            if(!screening_movie){
                throw new Error("فیلمی با این آی دی یافت نشد")
            }

        } catch (err) {
            next(err)
        }
        

    }
}

module.exports = new ScreeningController