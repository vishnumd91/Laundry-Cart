const Order = require("../models/Orders");
const mongoose = require('mongoose');

const getOrdersController = async (req, res) => {
    try {
        const orders = await Order.find({ user_id: req.user._id });
        res.status(200).send({
            success: true,
            data: orders
        })
    } catch (error) {
        // console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while getting orders",
            error
        });
    }
}

const deleteOrdersController = async (req, res) => {
    try{
            const delOrder = await Order.findByIdAndUpdate(
                req.params.id, 
                {
                    status: "Cancelled"
                }, 
                {new: true}
            );
            if(delOrder){
                res.status(200).send({
                    success: true,
                    message: "Order Cancelled successfully",
                });
            }else{
                res.status(404).send({
                    success: false,
                    message: "Order not found"
                })
            }
    }catch(error){
        // console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while deleting orders",
            error
        });
    }
}

const addOrderController = async (req, res) => {
    try {
        const result = await Order.create(req.body);
        res.json({
            status:"Success",
            result
        });
    } catch (error) {
        res.status(400).json({ 
            status : "Failed",
            error: error.message 
        });
    }
}

module.exports = {
    getOrdersController,
    deleteOrdersController,
    addOrderController
}