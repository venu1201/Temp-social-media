import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import User from '../models/Usermodel.js'


export const getusers = async (req, res) => {
    const { username } = req.body;
    // console.log(username)
    try {
        const users = await User.find();
        const filteredUsers = users.filter(user => user.username !== username);
        // console.log(filteredUsers);
        //console.log(username)
        res.status(200).json({ result: filteredUsers });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}
export const getuserdetails = async (req, res) => {
    const username = req.params.username;
    try {
        const user = await User.findOne({ username }).select('-password');
        if (user === null)
            res.status(404).json({ message: "no user found" });
        res.status(200).json({ result: user });
    } catch (error) {

    }
}
export const getgoogleuser = async (req, res) => {
    const email = req.params.email;

    try {
        const user = await User.findOne({ email });
        if (user === null)
            res.status(200).json({ result: null, check: 2 });
        // console.log(user);
        const token = jwt.sign({ email: user.email, id: user._id }, 'task', { expiresIn: "1h" });
        res.status(200).json({ result: user, check: 1, token });
    } catch (error) {
        res.status(500);
    }
}
export const signin = async (req, res) => {
    const { username, password } = req.body;
    // console.log(req.body);
    try {
        //const existinguser1=await User.findOne({email:username});
        const existinguser = await User.findOne({ username });
        if (!existinguser)
            return res.status(404).json({ message: 'User not exits' });
        const ispasswordcorrect = await bcrypt.compare(password, existinguser.password);
        if (!ispasswordcorrect)
            return res.status(400).json({ message: "invalid password" });
        const token = jwt.sign({ email: existinguser.email, id: existinguser._id }, 'task', { expiresIn: "1h" });
        // const {password,...data}=existinguser;
        res.status(200).json({ result: existinguser, token });
    } catch (error) {
        res.status(500).json({ message: "something went wrong" });
    }
}
export const signup = async (req, res) => {
    const { email, username, password, firstname, lastname, bio, confirmpassword, picture } = req.body;
    //console.log(req.body);
    try {
        const check = await User.findOne({ username });
        if (check)
            return res.status(404).json({ message: "username already Taken...Try different" });
        const existinguser = await User.findOne({ email });
        if (existinguser)
            return res.status(404).json({ message: "user already exists" });
        if (password != confirmpassword)
            return res.status(404).json({ message: "password and confirm password dont match" });
        const hashedpassword = await bcrypt.hash(password, 12);
        const result = await User.create({ email, password: hashedpassword, username, firstname, lastname, bio: '', profilepicture: picture });
        const token = jwt.sign({ email: result.email, id: result._id }, 'task', { expiresIn: "1h" });
        // const {password,...data}=result;
        res.status(200).json({ result, token });
    } catch (error) {
        res.status(500).json({ message: "something went wrong" });

    }
}


export const request = async (req, res) => {
    const touser = req.params.username;
    const { username } = req.body;
    console.log(touser,username,"gmmmmmm")

    try {
        const tousername = await User.findOne({ username: touser });
        const user = await User.findOne({ username });
        if (!tousername || !user)
            res.status(404).json({ message: 'user not found' })

        const { pending } = tousername;
        if (pending.includes(username)) {
            const updatedpending = pending.filter((user) => user !== username);
            tousername.pending = updatedpending;
            await User.updateOne({ username: touser }, { pending: updatedpending });
        }
        else {
            const updatedpending = [...pending, username];
            tousername.pending = updatedpending;
            await User.updateOne({ username: touser }, { pending: updatedpending });
        }
        const updated = await User.findOne({ username: touser });
        res.status(200).json({ result: updated });
        //console.log(pending)


    } catch (error) {
        console.log(error);
    }
}
export const getallpendingusers = async (req, res) => {
    const pending = req.body;

    try {
        const allusers = [];
        for (let i = 0; i < pending.length; i++) {
            const user = await User.findOne({ username: pending[i] }).select('-password');

            if (user) {

                allusers.push(user);
            }
        }
        console.log(allusers)
        res.status(200).json({ result: allusers });
    } catch (error) {
        console.log(error)
    }
}
export const updateuserdetails = async (req, res) => {
    const { username } = req.params;
    const { firstname, lastname, bio, selectedfile } = req.body;
    console.log(username)
    try {
        const user = await User.findOne({ username: username });
        if (!user) {
            res.status(404).json({ message: 'user not found' });
        }
        if(selectedfile)
        await User.updateOne({ username: username }, { firstname: firstname, lastname: lastname, bio: bio, profilepicture: selectedfile });
        else
        {
            await User.updateOne({ username: username }, { firstname: firstname, lastname: lastname, bio: bio});

        }
        const result = await User.find({ username: username });
    } catch (error) {
        console.log(error);
    }
}
export const removeascomepletefriend=async(req,res)=>{
    const username=req.params.username;
    const {touser}=req.body;
    try {
        const tousername=await User.findOne({username:touser});
        const user=await User.findOne({username:touser});
        if(!user || !tousername)
        {
            res.status(404).json({message:"user not found"});
        }
        const tousernamefollowers=tousername.followers;
        const tousernamefollowing=tousername.following;
        const userfollowing=user.following;
        const userfollowers=user.followers;
         
    } catch (error) {
        
    }
}
export const acceptanddeleteuser = async (req, res) => {
    const touser = req.params.username;
    const { username, method } = req.body;
    console.log(touser);
    try {
        const tousername = await User.findOne({ username: touser });
        const user = await User.findOne({ username });
        if (!tousername || !user)
            res.status(404).json({ message: 'user not found' })

        const { pending } = user;
        const { followers } = user;
        const { following } = tousername;
        const pending1 = tousername.pending;
        if (method === 'Accept') {
            const updatedpending = pending.filter((user) => user !== touser);
            console.log(updatedpending)
            tousername.pending = updatedpending;
            followers.push(touser);
            following.push(username);
            await User.updateOne({ username: username }, { pending: updatedpending, followers: followers });
            await User.updateOne({ username: touser }, { following: following });
        }
        else if (method === 'Delete') {
            const updatedpending = pending.filter((user) => user !== touser);
            tousername.pending = updatedpending;
            await User.updateOne({ username: username }, { pending: updatedpending });
        }
        else {
            const updatedpending = pending.filter((user) => user !== touser);
            tousername.pending = updatedpending;
            followers.push(touser);
            following.push(username);
            pending1.push(username);
            await User.updateOne({ username: username }, { pending: updatedpending, followers: followers });
            await User.updateOne({ username: touser }, { following: following, pending: pending1 });
        }
        const updated = await User.findOne({ username: username });
        res.status(200).json({ result: updated });
        //console.log(pending)
    } catch (error) {
        console.log(error);
    }

}