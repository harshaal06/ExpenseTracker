import User from "../models/User.js";

const postSignup = async (req, res) => {
    const { fullName, email, password, dob } = req.body;

    if (!(fullName && email && password && dob)) {
        return res.json({
            success: false,
            message: "All fields are required",
            data: null
        })
    }

    const existedUser = await User.findOne({
        $or: [{ email }]
    })

    if (existedUser) {
        return res.json({
            success: false,
            message: "User already registered",
            data: null
        })
    }
    const user = new User({ fullName, email, password, dob: new Date(dob) });


    try {
        const newUser = await user.save();

        res.json({
            success: true,
            message: `User signup successful`,
            data: newUser
        })
    }
    catch (e) {
        res.json({
            success: false,
            message: e.message,
            data: null
        })
    }
}

const postLogin = async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
        return res.json({
            success: false,
            message: "Email is required",
            data: null
        })
    }
    try {
        const user = await User.findOne({
            $or: [{ email }]
        })

        if (!user) {
            return res.json({
                success: false,
                message: "Invalid email.",
                data: null
            })
        }

        if (!(user.password == password)) {
            return res.json({
                success: false,
                message: "Invalid password.",
                data: null
            })
        }

        if (user) {
            return res.json({
                success: true,
                message: "User Login successful",
                data: user
            })
        }
    } catch (e) {
        res.json({
            success: false,
            message: e.message,
            data: null
        })
    }
}

export { postSignup, postLogin }