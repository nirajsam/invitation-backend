const mongoose = require('mongoose')

const guestSchema = new mongoose.Schema({
    name:{ type: String},
    address: {type:String},
    acceptOrDecline:{type:String},
    memberCount:{type:String},
    availabilityDates:{type:Array},
    familyType:{type: String},
    attendedMemberCount:{type:String}
});
guestSchema.index({ name: 1, address: 1, acceptOrDecline: 0, memberCount: 0, availabilityDates:0,attendedMemberCount:0 }, { unique: true });
const guestModel =mongoose.model("Guest", guestSchema);

module.exports= guestModel;