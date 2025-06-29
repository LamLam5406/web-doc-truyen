const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type:String,
        required:true,
        unique:true},
    password: {
        type:String,
        required:true},
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'},
    lichSu: [{
        truyen: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Truyen' },
        chuongSo: Number,
        ngayXem: {
            type: Date,
            default: Date.now }}]
})

module.exports=mongoose.model('User',UserSchema);