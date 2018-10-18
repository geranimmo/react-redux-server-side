const db = require('../../index').db;

module.exports.getRewardById = (req, res) => {
    db.query(`SELECT id, cover_url, name FROM reward_system_reward WHERE id=${req.params.id}`)
        .then(response => {
            res.status(200).json(response[0]);
        })
        .catch(() => {
            res.status(500).send('Oops, better luck next time!');
        });
};