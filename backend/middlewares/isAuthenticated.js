import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false,
            });
        }
        console.log("Token:", token); // Log the token

        const decode = jwt.verify(token, process.env.SECRET_KEY);
        console.log("Decoded token:", decode); // Log the decoded token

        if (!decode) {
            return res.status(401).json({
                message: "Invalid token",
                success: false,
            });
        }

        req.id = decode.userId; // Set the userId to req.id
        console.log("User ID set in req.id:", req.id); // Log to verify req.id is set

        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Internal server error',
            success: false,
        });
    }
};

export default isAuthenticated;
