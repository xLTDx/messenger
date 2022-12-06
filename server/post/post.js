import userModel from "../models/userModel.js"

export const addUser = async (req, res) => {

    try {

        const data = req.body

        const user = new userModel({
            name: data.name 
        })

        user.save()

        res.json({
            message: "Пользователь добавлен"
        })


    } catch (err) {
        res.status(500).json({
            message: "Ошибка добавления пользователя",
            error: err
        })
    }
}
