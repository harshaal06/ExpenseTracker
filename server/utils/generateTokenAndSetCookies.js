import jwt from "jsonwebtoken"

export const generateTokenAndSetCookie = (res,userId) =>{

    const token = jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:"5d"});

    res.cookie("access_token",token,{
            httpOnly: true,
            maxAge: 5 * 24 *60 *60 *1000
        }
    )

    return token;
}