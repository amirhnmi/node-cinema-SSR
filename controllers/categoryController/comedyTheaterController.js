const Controller = require("../controller")
const {validationResult}= require("express-validator")
const mongoose = require("mongoose");

const ComedyTheater = require("../../models/categories/categorie/comedyTheater");

class ComedyTheaterController extends Controller{
    async getComedyTheater(req,res){
        try {
            const ComedyTheater_movies = await ComedyTheater.find({})
            res.render("home.ejs", {comedytheater:ComedyTheater_movies})
        } catch (err) {
            next(err)
        }
        
    }

    async getOneComedyTheater(req,res){
        try {
            if(!mongoose.Types.ObjectId.isValid(req.params.id)){
                throw new Error("آیدی نامعتبر است")
            }
            const ComedyTheater_movie = await ComedyTheater.findById(req.params.id)
    
            if(!ComedyTheater_movie){
                throw new Error("فیلمی با این آی دی یافت نشد")
            }
    
            res.render("categories/screening.ejs", {comedytheater:ComedyTheater_movie})
        } catch (err) {
            next(err)
        }
        

    }

    async createComedyTheater(req,res){
        try {
            const { movie_name, title, description, image, director, actors, producer, production_date, release_date } = req.body;
            let newComedyTheater_movie= await ComedyTheater({
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

        newComedyTheater_movie = await newComedyTheater_movie.save()

        } catch (err) {
            next(err)
        }
        

    }

    async updateComedyTheater(req,res){
        try {
            if(!mongoose.Types.ObjectId.isValid(req.params.id)){
                throw new Error("آیدی نامعتبر است")
            }
    
            const { movie_name, title, description, image, director, actors, producer, production_date, release_date } = req.body
            const ComedyTheater_movie=await ComedyTheater.findByIdAndUpdate(req.params.id, {
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
    
            if(!ComedyTheater_movie){
                throw new Error("فیلمی با این آی دی یافت نشد")
            }

        } catch (err) {
            next(err)
        }
        

    }

    async deleteComedyTheater(req,res){
        try {
            if(!mongoose.Types.ObjectId.isValid(req.params.id)){
                throw new Error("آیدی نامعتبر است")
            }
    
            const ComedyTheater_movie = await ComedyTheater.findByIdAndRemove(req.params.id)
    
            if(!ComedyTheater_movie){
                throw new Error("فیلمی با این آی دی یافت نشد")
            }

        } catch (err) {
            next(err)
        }
        

    }
}

module.exports = new ComedyTheaterController