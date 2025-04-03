import {body} from "express-validator";

const userRegistrationValidator = () =>{
    return [
        body("email")
        .trim()
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Email is invalid"),
        body("username")
        .trim()
        .notEmpty().withMessage("Username is required")
        .isLength({min: 3}).withMessage("Username must be at least 3 characters long")
        .isLength({max: 20}).withMessage("Username must be at most 20 characters long"),

    ]
}

const userLoginValidator = () =>{
    return [
        body("email")
        .trim()
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Email is invalid"),
        body("password")
        .trim()
        .notEmpty().withMessage("Password is required")
    ]
}

export {userRegistrationValidator, userLoginValidator}