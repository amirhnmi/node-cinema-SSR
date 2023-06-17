const Controller = require("../controller")
const {validationResult}= require("express-validator")
const mongoose = require("mongoose");

const ChildrensTheater = require("../../models/categories/categorie/childrensTheater");

class ChildrensTheaterController extends Controller{
    async getChildrensTheater(req,res){
        try {
            const ChildrensTheater_movies = await ChildrensTheater.find({})
            res.render("home.ejs", {childrenstheater:ChildrensTheater_movies})
        } catch (err) {
            next(err)
        }
        
    }

    async getOneChildrensTheater(req,res){
        try {
            if(!mongoose.Types.ObjectId.isValid(req.params.id)){
                throw new Error("آیدی نامعتبر است")
            }
            const ChildrensTheater_movie = await ChildrensTheater.findById(req.params.id)
    
            if(!ChildrensTheater_movie){
                throw new Error("فیلمی با این آی دی یافت نشد")
            }
    
            res.render("home.ejs", {childrenstheater:ChildrensTheater_movie})
        } catch (err) {
            next(err)
        }
        

    }

    async createChildrensTheater(req,res){
        try {
            const { movie_name, title, description, image, director, actors, producer, production_date, release_date } = req.body;
            let newChildrensTheater_movie= await ChildrensTheater({
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

        newChildrensTheater_movie = await newChildrensTheater_movie.save()

        } catch (err) {
            next(err)
        }
        

    }

    async updateChildrensTheater(req,res){
        try {
            if(!mongoose.Types.ObjectId.isValid(req.params.id)){
                throw new Error("آیدی نامعتبر است")
            }
    
            const { movie_name, title, description, image, director, actors, producer, production_date, release_date } = req.body
            const ChildrensTheater_movie=await ChildrensTheater.findByIdAndUpdate(req.params.id, {
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
    
            if(!ChildrensTheater_movie){
                throw new Error("فیلمی با این آی دی یافت نشد")
            }

        } catch (err) {
            next(err)
        }
        

    }

    async deleteChildrensTheater(req,res){
        try {
            if(!mongoose.Types.ObjectId.isValid(req.params.id)){
                throw new Error("آیدی نامعتبر است")
            }
    
            const ChildrensTheater_movie = await ChildrensTheater.findByIdAndRemove(req.params.id)
    
            if(!ChildrensTheater_movie){
                throw new Error("فیلمی با این آی دی یافت نشد")
            }

        } catch (err) {
            next(err)
        }
        

    }
}

module.exports = new ChildrensTheaterController