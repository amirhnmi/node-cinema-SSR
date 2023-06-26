const Controller = require("../controller")
const {validationResult}= require("express-validator")
const mongoose = require("mongoose");

const SalesTable = require("../../models/salestable & news/salestable");

class SalesTableController extends Controller{
    async getSalesTable(req,res,next){
        try {
            const SalesTable_movies = await SalesTable.find({})
            res.render("adminDashboard/salesTableForm/salesTableCreateForm.ejs", {salestables:SalesTable_movies})
        } catch (err) {
            next(err)
        }
        
    }

    async getOneSalesTable(req,res,next){
        try {
            if(!mongoose.Types.ObjectId.isValid(req.params.id)){
                req.flash("errors","آیدی نامعتبر است")
            }
            const SalesTable_movie = await SalesTable.findById(req.params.id)
    
            if(!SalesTable_movie){
                req.flash("errors","فیلمی با این آی دی یافت نشد")
            }
    
            res.render("adminDashboard/salesTableForm/salesTableUpdateForm.ejs", {salestable:SalesTable_movie})
        } catch (err) {
            next(err)
        }
        

    }

    async createSalesTable(req,res,next){
        try {
            const { movie_name,image, director, last_update, price} = req.body;            
            let newsalestable= await new SalesTable({
                movie_name,
                image,
                director,
                price,
                last_update,
            })
            if(req.file){
                newsalestable.image = req.file.path.replace(/\\/g,"/").substring(6)
               }
               newsalestable = await newsalestable.save()
            req.flash("message", "اطلاعات فیلم مورد نظر با موفقیت اضافه شد")
            return res.redirect("/admin/salestable");
        } catch (err) {
            next(err)
        }
    }

    async updateSalesTable(req,res,next){
        try {
            if(!mongoose.Types.ObjectId.isValid(req.params.id)){
                req.flash("errors","آیدی نامعتبر است")
            }
                
            const { movie_name,image, director, last_update, price} = req.body
            let data = {
                movie_name,
                director,
                image,
                price,
                last_update,
            }
            if(req.file){
                data.image = req.file.path.replace(/\\/g,"/").substring(6)
               }
               const salestable=await SalesTable.findByIdAndUpdate(req.params.id, {$set : data},{new: true});
            
               if(!salestable){
                req.flash("errors","فیلمی با این آی دی یافت نشد")
            }
            req.flash("message", "اطلاعات فیلم مورد نظر با موفقیت به روزرسانی شد")
            res.redirect("/admin/salestable")

        } catch (err) {
            next(err)
        }
    }

    async deleteSalesTable(req,res,next){
        try {
            if(!mongoose.Types.ObjectId.isValid(req.params.id)){
                req.flash("errors","آیدی نامعتبر است")
            }
    
            const SalesTable_movie = await SalesTable.findByIdAndRemove(req.params.id)    
            if(!SalesTable_movie){
                req.flash("errors","فیلمی با این آی دی یافت نشد")
            }
            req.flash("message", "اطلاعات فیلم مورد نظر با موفقیت به حدف شد")
            res.redirect("/admin/salestable")

        } catch (err) {
            next(err)
        }
    }
}

module.exports = new SalesTableController