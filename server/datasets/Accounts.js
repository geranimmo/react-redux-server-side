import mongoose from 'mongoose';

module.exports = mongoose.model('accounts', {
    address: String,
    city: String,
    dateOfBirth: Number,
    email: String,
    email_verified: Boolean,
    gender: String,
    hobby: String,
    identityNumber: String,
    name: String,
    phoneNumber: String,
    postCode: String,
    ps_id: String,
    register_time: Number,
    shippingAddress: [{
        address: String,
        city: String,
        postCode: String
    }],
    partner: [String],
    rewardsBuy: [{
        reward_id: Number,
        reward_name: String,
        reward_category: String,
        reward_type: String,
        reward_supplier_name: String,
        reward_supplier_id: Number,
        reward_merchant_name: String,
        reward_merchant_id: Number,
        reward_buy_time: String,
        last_update: String
    }],
    rewardBookmarkList: [Number],
    rewardWatchlist: [{
        reward_id: Number,
        reward_name: String,
        reward_category: String,
        reward_type: String,
        reward_supplier_name: String,
        reward_supplier_id: Number,
        reward_merchant_name: String,
        reward_merchant_id: Number,
        reward_total_watch: Number,
        reward_watch_time: [String],
        last_update: String
    }],
    listInterestedRewardCategories: [String],
    listInterestedRewardTypes: [String],
    listInterestedRewardMerchants: [String],
    listInterestedRewardSupplier: [String],
    listInterestedRewardName: [String],
    chatRoom: [{
        room_name: String,
        list_users: [{
            user_id: String,
            user_picture: String,
            user_name: String
        }],
        last_chat_time: String
    }],
    friendList: [{
        user_id: String,
        user_picture: String,
        user_name: String
    }]
});