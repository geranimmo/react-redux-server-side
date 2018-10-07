import React from 'react';
import { renderToString } from 'react-dom/server';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { StaticRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import reducers from '../../src/reducers';
import { renderHtml } from '../template';
import Routes from '../../src/Routes';
import Rewards from '../datasets/Rewards';

module.exports = (req, res) => {
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
    ], function(err, result) {
        if (err) {
            res.status(500).send('Oops, better luck next time!');
        } else {
            const data = result[0];
            const store = createStore(reducers, {}, applyMiddleware(thunk));
    
            let context = {};
            const html = renderToString(
                <Provider store={store}>
                    <StaticRouter location={req.url} context={context}>
                        {renderRoutes(Routes)}
                    </StaticRouter>
                </Provider>
            );

            const preloadedState = {
                path: req.url,
                title: data.reward_name,
                image: data.reward_picture,
                enthusiasts: data.list_user_enthusiasts,
                bookmarks: data.list_user_bookmarks
            };

            res.set('Cache-Control', 'public, max-age=600, s-maxage=1200');
            res.send(renderHtml(html, preloadedState));
        }
    });

    
};