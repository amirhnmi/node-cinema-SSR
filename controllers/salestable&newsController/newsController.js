const Controller = require("../controller")
const {validationResult}= require("express-validator")
const mongoose = require("mongoose");

const News = require("../../models/salestable & news/news");

class NewsController extends Controller{
    async getNews(req,res, next){
        try {
            const News_movies = await News.find({})
            res.render("adminDashboard/newsForm/newsCreateForm.ejs", {news:News_movies})
        } catch (err) {
            next(err)
        }
        
    }

    async getOneNews(req,res, next){
        try {
            if(!mongoose.Types.ObjectId.isValid(req.params.id)){
                req.flash("errors","آیدی نامعتبر است")
            }
            const News_movie = await News.findById(req.params.id)
    
            if(!News_movie){
                req.flash("errors","خبری با این آی دی یافت نشد")
            }
    
            res.render("adminDashboard/newsForm/newsUpdateForm.ejs", {news:News_movie})
        } catch (err) {
            next(err)
        }
        

    }

    async createNews(req,res, next){
        try {
            const {title, description,news_text, image, author, news_date, publish_date} = req.body;            
            let newnews= await new News({
                title,
                description,
                news_text,
                image,
                author,
                news_date,
                publish_date
            })
            if(req.file){
                newnews.image = req.file.path.replace(/\\/g,"/").substring(6)
               }
               newnews = await newnews.save()
            req.flash("message", "خبر مورد نظر با موفقیت اضافه شد")
            return res.redirect("/admin/news");
        } catch (err) {
            next(err)
        }
    }

    async updateNews(req,res, next){
        try {
            if(!mongoose.Types.ObjectId.isValid(req.params.id)){
                req.flash("errors","آیدی نامعتبر است")
            }
                
            const {title, description,news_text, image, author, news_date, publish_date} = req.body;
            let data = {
                title,
                description,
                news_text,
                image,
                author,
                news_date,
                publish_date
            }
            if(req.file){
                data.image = req.file.path.replace(/\\/g,"/").substring(6)
               }
               const News_movie=await News.findByIdAndUpdate(req.params.id, {$set : data},{new: true});
            
            if(!News_movie){
                req.flash("errors","خبری با این آی دی یافت نشد")
            }
            req.flash("message", "خبر مورد نظر با موفقیت به روزرسانی شد")
            res.redirect("/admin/news")

        } catch (err) {
            next(err)
        }
        

    }

    async deleteNews(req,res, next){
        try {
            if(!mongoose.Types.ObjectId.isValid(req.params.id)){
                req.flash("errors","آیدی نامعتبر است")
            }
    
            const News_movie = await News.findByIdAndRemove(req.params.id)
    
            if(!News_movie){
                req.flash("errors","خبری با این آی دی یافت نشد")
            }
            req.flash("message", "خبر مورد نظر با موفقیت به حدف شد")
            res.redirect("/admin/news")

        } catch (err) {
            next(err)
        }
        

    }
}

module.exports = new NewsController