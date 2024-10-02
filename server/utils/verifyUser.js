import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token

    if(!token){
        return res.json({
            success: false,
            message: "Unauthorized. Cookies not set.",
            data: null
        })
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err){
            return res.json({
                success: false,
                message: err.message,
                data: null
            })
        }

        req.user = user;
        next();
    })
}