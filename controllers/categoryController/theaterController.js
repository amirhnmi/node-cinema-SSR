const Controller = require("../controller")
const {validationResult}= require("express-validator")
const mongoose = require("mongoose");

const Theater = require("../../models/categories/categorie/theater");

class TheaterController extends Controller{
    async getTheater(req,res){
        try {
            const theater_movies = await Theater.find({})
            res.render("home.ejs", {theaters:theater_movies})
        } catch (err) {
            next(err)
        }
        
    }

    async getOneTheater(req,res){
        try {
            if(!mongoose.Types.ObjectId.isValid(req.params.id)){
                throw new Error("آیدی نامعتبر است")
            }
            const theater_movie = await Theater.findById(req.params.id)
    
            if(!theater_movie){
                throw new Error("فیلمی با این آی دی یافت نشد")
            }
    
            res.render("categories/screening.ejs", {theater:theater_movie})
        } catch (err) {
            next(err)
        }
        

    }

    async createTheater(req,res){
        try {
            const { movie_name, title, description, image, director, actors, producer, production_date, release_date } = req.body;
            let newtheater_movie= await Theater({
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

        newtheater_movie = await newtheater_movie.save()

        } catch (err) {
            next(err)
        }
        

    }

    async updateTheater(req,res){
        try {
            if(!mongoose.Types.ObjectId.isValid(req.params.id)){
                throw new Error("آیدی نامعتبر است")
            }
    
            const { movie_name, title, description, image, director, actors, producer, production_date, release_date } = req.body
            const theater_movie=await Theater.findByIdAndUpdate(req.params.id, {
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
    
            if(!theater_movie){
                throw new Error("فیلمی با این آی دی یافت نشد")
            }

        } catch (err) {
            next(err)
        }
        

    }

    async deleteTheater(req,res){
        try {
            if(!mongoose.Types.ObjectId.isValid(req.params.id)){
                throw new Error("آیدی نامعتبر است")
            }
    
            const theater_movie = await Theater.findByIdAndRemove(req.params.id)
    
            if(!theater_movie){
                throw new Error("فیلمی با این آی دی یافت نشد")
            }

        } catch (err) {
            next(err)
        }
        

    }
}

module.exports = new TheaterController