const express = require("express")
const router = express.Router()

const SalesTablesController = require("../../controllers/salestable&newsController/salesTableController")

router.get("/", SalesTablesController.getSalesTable)
router.get("/:id", SalesTablesController.getOneSalesTable)
router.post("/create", SalesTablesController.createSalesTable)
router.put("/update/:id", SalesTablesController.updateSalesTable)
router.delete("/delete/:id", SalesTablesController.deleteSalesTable)

module.exports = router