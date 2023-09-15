import mongoose from "mongoose";
import validator from "validator";

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { UserModel } from "../types/models";

const UserSchema = new mongoose.Schema<UserModel>(
	{
		name: {
			type: String,
			required: [true, "Please tell use your name"],
		},

		email: {
			type: String,
			required: [true, "Please provide your email"],
			unique: true,
			lowercase: true,
			validate: [validator.isEmail, "Please provide a valid email"],
		},

		image: String,
		bio: String,
		password: {
			type: String,
			required: [true, "Please provide a password"],
			minlength: 8,
			select: false,
		},

		passwordConfirm: {
			type: String,
			required: [true, "Please confirm your password"],
			validate: {
				// This only works on CREATE and SAVE!!!
				validator: function (this: UserModel, el: string) {
					return el === this.password;
				},
				message: "Passwords are not the same!",
			},
		},
	},
	{
		timestamps: true,
	},
);

const User = mongoose.model("User", UserSchema);

export default User;
