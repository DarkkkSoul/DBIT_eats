import CafeFood from "../models/cafeFood.model.js";
import connectToDb from "../database/connectToDb.js";

export const createCafeFood = async (req, res, next) => {
    try {
        await connectToDb();
        if (req.user.email === 'admin@gmail.com') {
            const cafeFood = await CafeFood.create({ ...req.body, createdBy: req.user.name });

            res.status(200).json({
                success: true,
                message: 'Cafeteria food created successfully',
                data: {
                    item: cafeFood
                }
            })
        } else {
            const error = new Error("Unauthorized");
            error.statusCode = 404;
            throw error;
        }
    } catch (error) {
        next(error);
    }
}

export const showCafeMenu = async (req, res, next) => {
    try {
        await connectToDb();
        const cafeMenu = await CafeFood.find();

        res.status(200).json({
            success: true,
            message: 'Cafeteria Menu loaded',
            menu: {
                cafeMenu
            }
        });


    } catch (error) {
        next(error);
    }
}

export const itemSoldOut = async (req, res, next) => {
    try {
        await connectToDb();
        const { id } = req.params;

        const foodItem = await CafeFood.findById(id);

        if (foodItem) {
            foodItem.isSoldOut = true;
            await foodItem.save();
            res.status(200).json({
                success: true,
                message: 'Item Sold Out',
                data: foodItem
            })
        }

    } catch (error) {
        next(error);
    }
}

export const itemAvailable = async (req, res, next) => {
    try {
        await connectToDb();
        const { id } = req.params;

        const foodItem = await CafeFood.findById(id);

        if (foodItem.isSoldOut) {
            foodItem.isSoldOut = false;
            await foodItem.save();
            res.status(200).json({
                success: true,
                message: 'Item Available',
                data: foodItem
            })
        }

    } catch (error) {
        next(error);
    }
}