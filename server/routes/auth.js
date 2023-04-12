const router = require("express").Router();
const { User } = require("../models/user");
const bcrypt = require("bcryptjs");
const Joi = require("joi");
const Token=require("../models/token");
const sendEmail=require("../utils/sendEmail");
const crypto=require("crypto");

router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
		if (!user)
			return res.status(401).send({ message: "Invalid Email or Password" });

		const validPassword = await bcrypt.compare(
			req.body.password,
			user.password
		);
		if (!validPassword)
			return res.status(401).send({ message: "Invalid Email or Password" });

		if(!user.verified){
			let token=await Token.findOne({userId:user._id});
			if(!token){
				token=await new Token({
					userId: user._id,
					token:crypto.randomBytes(32).toString("hex")
				}).save();
				const url=`${process.env.BASE_URL}users/${user._id}/verify/${token.token}`;
				await sendEmail(user.email,"Verify Email",url);
			}
			return res.status(400).send({message:"An Email sent to your account please verify"})
		}

		const token = user.generateAuthToken();
		const UserData = await User.findOne({ email: req.body.email }).exec();
		// console.log('User Data', UserData)
		const data={}
		data['firstname']=UserData.firstName
		data['lastname']=UserData.lastName
		data['mail']=UserData.email
		data['token']=token
		data['phone']=UserData.phone
		data['company']=UserData.company
		data['desig']=UserData.desig
		data['gender']=UserData.gender
		// console.log('data',data)
		res.status(200).send({ data: data, message: "logged in successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error11" });
	}
});

const validate = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required().label("Email"),
		password: Joi.string().required().label("Password"),
	});
	return schema.validate(data);
};

module.exports = router;