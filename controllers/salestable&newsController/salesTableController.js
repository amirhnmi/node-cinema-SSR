const Controller = require("../controller")
const {validationResult}= require("express-validator")
const mongoose = require("mongoose");

const SalesTable = require("../../models/salestable & news/salestable");

class SalesTableController extends Controller{
    async getSalesTable(req,res){
        try {
            const SalesTable_movies = await SalesTable.find({})
            res.render("home.ejs", {salestable:SalesTable_movies})
        } catch (err) {
            next(err)
        }
        
    }

    async getOneSalesTable(req,res){
        try {
            if(!mongoose.Types.ObjectId.isValid(req.params.id)){
                throw new Error("آیدی نامعتبر است")
            }
            const SalesTable_movie = await SalesTable.findById(req.params.id)
    
            if(!SalesTable_movie){
                throw new Error("خبری با این آی دی یافت نشد")
            }
    
            res.render("home.ejs", {salestable:SalesTable_movie})
        } catch (err) {
            next(err)
        }
        

    }

    async createSalesTable(req,res){
        try {
            const { movie_name,image, director, last_update, price} = req.body;        
            let newsalestable= await this.SalesTable({
                movie_name,
                image,
                director,
                price,
                last_update,
            })

        newsalestable = await newsalestable.save()

        } catch (err) {
            next(err)
        }
    }

    async updateSalesTable(req,res){
        try {
            if(!mongoose.Types.ObjectId.isValid(req.params.id)){
                throw new Error("آیدی نامعتبر است")
            }
            const { movie_name,image, director, last_update, price} = req.body
            const salestable=await this.SalesTable.findByIdAndUpdate(req.params.id, {
                movie_name,
                director,
                image,
                price,
                last_update,
            },{new: true});
    
            if(!SalesTable_movie){
                throw new Error("خبری با این آی دی یافت نشد")
            }

        } catch (err) {
            next(err)
        }
        

    }

    async deleteSalesTable(req,res){
        try {
            if(!mongoose.Types.ObjectId.isValid(req.params.id)){
                throw new Error("آیدی نامعتبر است")
            }
    
            const SalesTable_movie = await SalesTable.findByIdAndRemove(req.params.id)
    
            if(!SalesTable_movie){
                throw new Error("خبری با این آی دی یافت نشد")
            }

        } catch (err) {
            next(err)
        }
        

    }
}

module.exports = new SalesTableController