const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token || !token.startsWith('Bearer ') || token === "null" || token === "undefined") {
        return res.status(401).json({ success: false, msg: "Unauthorized" });
    }

    const actualToken = token.split(' ')[1];

    try {
        const decodedToken = jwt.verify(actualToken, process.env.SECRET_KEY);
        req.user = decodedToken.userId;
        req.name = decodedToken.name;
        next(); 
    } catch (error) {
        return res.status(401).json({ success: false, msg: "Unauthorized: Invalid token", error: error.message }); 
    }
};

module.exports = { auth };
