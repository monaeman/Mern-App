
//@desc Get goals. register new user
//@route Get/api/ goals.  post/ api/ users
//@acess       public
const registerUser = (req, res) => {
res.json({message: ' Register User'})

}

//@desc     Authenticate a user 
//@route      post/ api/ users/ login 
//@acess       public


const loginUser = (req, res) => {
    res.json({message: ' Login User'})
    
    }

    //@desc    get user data
//@route Get/api/ me  
//@acess       public

    const getMe = (req, res) => {
        res.json({message: ' User Data display'})
        
        }




module.exports = {
    registerUser,
    loginUser,
    getMe

}
