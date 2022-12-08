import dialogModel from "../models/dialogModel.js"
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

export const getUsers = async (req, res) => {

    try {

        console.log(req.body)
        const result = await userModel.find({ "_id": { $ne: req.body.id } })

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

export const createDialog = async (req, res) => {

    try {

        const data = req.body

        console.log(data)

        const dialog = new dialogModel({
            dialogId: data.dialogId,
            users: data.users
        })



        dialog.save()

        res.json({
            message: "Диалог создан"
        })


    } catch (err) {
        res.status(500).json({
            message: "Ошибка добавления пользователя",
            error: err
        })
    }
}

export const dialogExists = async (req, res) => {

    try {

        const data = await dialogModel.find({ users: req.body.users })


        if (data[0] != undefined)
            return res.json({
                status: 1
            })
        else
            return res.json({
                status: 0
            })





    } catch (err) {
        res.status(500).json({
            message: "Ошибка добавления пользователя",
            error: err
        })
    }
}


export const getDialogId = async (req, res) => {

    try {

        const data = await dialogModel.find({ users: req.body.users })

        res.json({
            id: data[0]._id
        })


    } catch (err) {
        res.status(500).json({
            message: "Ошибка добавления пользователя",
            error: err
        })
    }
}

export const addMessage = async (req, res) => {

    try {


        await dialogModel.findOneAndUpdate(
            { _id: req.body.dialogId },
            {
                $push:
                {
                    messages: {
                        sender: req.body.sender,
                        text: req.body.text
                    }
                }
            }
        )

        res.json({
            status: 1
        })



    } catch (err) {
        res.status(500).json({
            message: "Ошибка поиска сообщений",
            error: err
        })
    }
}

export const getMessage = async (req, res) => {

    try {

        const data = await dialogModel.find({ _id: req.body.dialogId })

        return res.json({
            messages: data[0].messages
        })




    } catch (err) {
        res.status(500).json({
            message: "Ошибка поиска сообщений",
            error: err
        })
    }
}

export const getUsersFromDialog = async (req, res) => {

    try {

        const data = await dialogModel.find({ _id: req.body.dialogId })

        return res.json({
            users: data[0].users
        })


    } catch (err) {
        res.status(500).json({
            message: "Ошибка поиска сообщений",
            error: err
        })
    }
}

export const getRecepient = async (req, res) => {

    try {

        const data = await dialogModel.find({ _id: req.body.dialogId, userId: req.body.userId })

        const users = data[0].users




        let recepient

        users.forEach(element => {

            if (element != req.body.userId) {

                recepient = element
            }
        });

        const userData = await userModel.find({ "_id": recepient })

        return res.json({
            user: userData
        })


    } catch (err) {
        res.status(500).json({
            message: "Ошибка поиска получателя сообщений",
            error: err
        })
    }
}

export const getLastMessage = async (req, res) => {

    try {

        const data = await dialogModel.find({ _id: req.body.dialogId })

        let lenght = data[0].messages.length


        return res.json({
            message: data[0].messages[lenght - 1]
        })




    } catch (err) {
        res.status(500).json({
            message: "Ошибка поиска сообщений",
            error: err
        })
    }
}