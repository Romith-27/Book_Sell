const User = require("../models/user.js");
const jwt = require("jsonwebtoken");

exports.auth = async (req, res, next) => {
    try {
        console.log(req.body,"body")
        const token =
            req.body.token ||
            req.cookies.token ||
            req.header("Authorization").replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token is Missing",
            });
        }

        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            console.log(payload);
            req.user = payload;
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "Token is Invalid",
            });
        }
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Something Went Wrong While Validating The Token",
        });
    }
};


exports.isUser = async( req,res,next)=>{
    try {
        if(req.user.accountType!=="User"){
            return res.status(401).json({
                success: false,
                message: "This is a Protected Route for User Only",
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User Role Cannot be Verified, Please Try Again",
        });
    }
}


exports.isAdmin = async (req, res, next) => {
    try {
        console.log(req.user.accountType);
        if (req.user.accountType !== "Admin") {
            return res.status(401).json({
                success: false,
                message: "This is a Protected Route For Admin Only",
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User Role Cannot be Verified, Please Try Again",
        });
    }
};