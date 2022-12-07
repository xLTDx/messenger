import userModel from "../models/userModel.js"

export const getOneUser = async (req, res) => {

    try {

        const result = await userModel.find({"_id": req.body.id})

        res.json({
            result
        })


    } catch (err) {
        res.status(500).json({
            message: "Ошибка поиска пользователей",
            error: err
        })
    }
}