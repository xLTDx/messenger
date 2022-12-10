import {body} from "express-validator";

export const registrationValidation = [
    body("login", "Слишком короткий логин").isLength({min: 3}),
    body("password", "Пароль слишком короткий").isLength({min: 5}),
    body("name", "Слишком короткое имя").isLength({min: 2}),      
];

export const loginValidation = [
    body("login", "Слишком короткий логин").isLength({min: 3}),
    body("password", "Пароль слишком короткий").isLength({min: 5}),      
];
