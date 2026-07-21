const jwt = require("jsonwebtoken");
const Donor = require("../models/Donor");

const authMiddleware = async (req, res, next) => {

    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Access denied. No token provided."
        });
    }

    const jwtToken = token.replace("Bearer ", "");

    try {

        const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);

        const donor = await Donor.findById(decoded.id);

        if (!donor) {
            return res.status(404).json({
                success: false,
                message: "Donor not found"
            });
        }

        req.user = donor;

        next();

    } catch (error) {
    console.log("JWT Error:", error);

    return res.status(401).json({
        success: false,
        message: error.message
    });
}
};

module.exports = authMiddleware;