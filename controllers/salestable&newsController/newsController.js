const Controller = require("../controller")
const {validationResult}= require("express-validator")
const mongoose = require("mongoose");

const News = require("../../models/salestable & news/news");

class NewsController extends Controller{
    async getNews(req,res){
        try {
            const News_movies = await News.find({})
            res.render("home.ejs", {news:News_movies})
        } catch (err) {
            next(err)
        }
        
    }

    async getOneNews(req,res){
        try {
            if(!mongoose.Types.ObjectId.isValid(req.params.id)){
                throw new Error("آیدی نامعتبر است")
            }
            const News_movie = await News.findById(req.params.id)
    
            if(!News_movie){
                throw new Error("خبری با این آی دی یافت نشد")
            }
    
            res.render("home.ejs", {news:News_movie})
        } catch (err) {
            next(err)
        }
        

    }

    async createNews(req,res){
        try {
            const {title, description,news_text, image, author, news_date, publish_date} = req.body;
            let newnews= await this.News({
                title,
                description,
                news_text,
                image,
                author,
                news_date,
                publish_date
            })

            newnews = await newnews.save()

        } catch (err) {
            next(err)
        }
    }

    async updateNews(req,res){
        try {
            if(!mongoose.Types.ObjectId.isValid(req.params.id)){
                throw new Error("آیدی نامعتبر است")
            }
    
            const {title, description,news_text, image, author, news_date, publish_date} = req.body;        
            const news=await this.News.findByIdAndUpdate(req.params.id, {
                title,
                description,
                news_text,
                image,
                author,
                news_date,
                publish_date
            },{new: true});
    
            if(!News_movie){
                throw new Error("خبری با این آی دی یافت نشد")
            }

        } catch (err) {
            next(err)
        }
        

    }

    async deleteNews(req,res){
        try {
            if(!mongoose.Types.ObjectId.isValid(req.params.id)){
                throw new Error("آیدی نامعتبر است")
            }
    
            const News_movie = await News.findByIdAndRemove(req.params.id)
    
            if(!News_movie){
                throw new Error("خبری با این آی دی یافت نشد")
            }

        } catch (err) {
            next(err)
        }
        

    }
}

module.exports = new NewsController