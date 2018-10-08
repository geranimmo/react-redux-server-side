import Rewards from '../datasets/Rewards';

module.exports.getRewardById = (req, res) => {
    Rewards.aggregate([
        {
            $match: { reward_id: Number(req.params.id) }
        }, {
            $project: {
                _id: 0,
                reward_id: 1,
                reward_name: 1,
                reward_picture: 1,
                list_user_bookmarks: 1,
                list_user_enthusiasts: 1
            }
        }, {
            $lookup: {
                from: 'accounts',
                localField: 'list_user_bookmarks',
                foreignField: 'ps_id',
                as: 'list_user_bookmarks'
            }
        }, {
            $addFields: {
                list_user_bookmarks: {
                    $map: {
                        input: '$list_user_bookmarks',
                        as: 'list_bookmark',
                        in: {
                            ps_id: '$$list_bookmark.ps_id',
                            name: '$$list_bookmark.name'
                        }
                    }
                }
            }
        }, {
            $lookup: {
                from: 'accounts',
                localField: 'list_user_enthusiasts',
                foreignField: 'ps_id',
                as: 'list_user_enthusiasts'
            }
        }, {
            $addFields: {
                list_user_enthusiasts: {
                    $map: {
                        input: '$list_user_enthusiasts',
                        as: 'list_enthusiast',
                        in: {
                            ps_id: '$$list_enthusiast.ps_id',
                            name: '$$list_enthusiast.name'
                        }
                    }
                   
                }
            }
        }
    ], (err, result) => {
        if (err) {
            res.status(400).send('Oops, better luck next time!');
        } else {
            res.status(200).json(result[0]);
        }
    });
};