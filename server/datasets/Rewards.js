import mongoose from 'mongoose';

module.exports = mongoose.model('rewards', {
    reward_id: Number,
    reward_name: String,
    reward_picture: String,
    reward_category: String,
    reward_supplier: String,
    reward_merchant: String,
    reward_total_buy: Number,
    reward_total_like: Number,
    list_user_enthusiasts: [String],
    list_buyers: [String],
    list_user_bookmarks: [String]
});