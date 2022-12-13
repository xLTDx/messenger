import dialogModel from "../models/dialogModel.js"
import userModel from "../models/userModel.js"
import bcrypt from 'bcrypt'
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";

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

export const registration = async (req, res) => {

    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }

        const candidate = await userModel.findOne({ login: req.body.login })


        if (candidate) {

            return res.json({
                status: 0,
                message: "Пользователь уже существует"
            })
        }


        const salt = bcrypt.genSaltSync(7);

        const password = bcrypt.hashSync(req.body.password, salt);

        const newUser = new userModel({
            login: req.body.login,
            password,
            name: req.body.name,

        })

        newUser.save()

        return res.json({
            status: 1,
            message: "Пользователь добавлен"
        })


    } catch (err) {
        res.status(500).json({
            status: -1,
            message: "Ошибка добавления пользователя",
            error: err
        })
    }
}

export const login = async (req, res) => {

    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }

        const user = await userModel.findOne({ login: req.body.login })

        if (!user) {
            return res.json({
                message: "Пользователь не найден"
            })
        }

        const auth = bcrypt.compareSync(req.body.password, user.password)

        if (auth) {
            
            const dataToken = {
                id: user._id,
                login: user.login
            }

            const token = jwt.sign(dataToken, "secret_word", { expiresIn: "30d" })
            
            return res.json({
                id: user._id,
                login: user.login,
                name: user.name,
                token
            })
        }
        else {
            return res.status(401).json({
                message: "Не верный пароль"
            })
        }




    } catch (err) {
        res.status(500).json({
            message: "Ошибка входа",
            error: err
        })
    }
}

