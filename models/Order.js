const mongoose = require('mongoose');
const User = require('./User');
const Lecture = require('./Lecture');
const Schema = mongoose.Schema;
const orderSchema = Schema({
    shpAddrss: {
        type: Object,
        required: true
    },
    contact: {
        type: Object,
        required: true
    },
    ttlPrc: {
        type: Number,
        required: true,
        default: 0
    },
    userId: {
        type: mongoose.ObjectId,
        ref: User,
        required: true
    },
    status: {
        type: String,
        default: 'preparing'
    },
    orderNum: { 
        type: String 
    },
    items: [{
        lectureId: {
            type: mongoose.ObjectId,
            ref: Lecture,
            required: true
        },
        type: {
            type: String,
            required: true
        }
    }]
}, {timestamps: true});

orderSchema.methods.toJSON = function () {
    const obj = this._doc;
    delete obj.__v;
    delete obj.updateAt;
    delete obj.createAt;

    return obj;
};

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;