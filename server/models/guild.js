const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Guild = new Schema({
    guildID: {
        type: String,
    },
    prefix: { 
        type: String, 
        default: "!" 
    },
});


const GuildModel = mongoose.model('Guild', Guild);

module.exports = {
    GuildModel
}