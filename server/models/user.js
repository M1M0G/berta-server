const mongoose = require("mongoose");
const generatePasswordHash = require("../utils")

const Schema = mongoose.Schema;

const userModelSchema = new Schema({
    email: {
        type: String,
        require: "Email address is required!",
        unique: true,
    },
    nickname: {
        type: String,
        require: 'Nickname is required'
    },
    password: {
        type: String,
        require: "Password is required"
    },
    confirmed: {
        type: Boolean,
        default: false
    }
});

userModelSchema.pre('save', async function(next) {
    const user = this;
    if(!user.isModified('password')) {
        return next();
    }
    user.password = await generatePasswordHash(user.password)
});

const UserModel = mongoose.model("User", userModelSchema)

module.exports = {
    UserModel
}





// const Unit = new Schema({
//     guildID: {
//         type: String,
//     },
//     userID: {
//         type: String,
//         default: ''   
//     },
//     strength: {
//         type: Number,
//         default: 0
//     },
//     endurance: {
//         type: Number,
//         default: 0
//     },
//     charisma: {
//         type: Number,
//         default: 0
//     },
//     intelligence: {
//         type: Number,
//         default: 0
//     },
//     agility: {
//         type: Number,
//         default: 0
//     }, 
//     luck: {
//         type: Number,
//         default: 0
//     },
//     class: {
//         type: Number,
//         default: 0
//     }, 
//     coins: {
//         type: Number,
//         default: 15
//     }, 
//     pets: {
//         type: Array,
//         default: []
//     },
//     armor: {
//         type: Array,
//         default: []
//     },
//     weapon: {
//         type: Array,
//         default: []
//     },
//     hp: {
//         type: Number,
//         default: 100
//     },
//     stamina: {
//         type: Number,
//         default: 100
//     },
// })

// const UnitModel = mongoose.model('Unit', Unit);

// module.exports = {
//     UnitModel
//   }