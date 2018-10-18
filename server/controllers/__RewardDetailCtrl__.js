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

const db = require('../index').db;

module.exports = (req, res) => {
    db.query(`SELECT id, cover_url, name FROM reward_system_reward WHERE id=${req.params.id}`)
        .then(response => {
            const store = createStore(reducers, {}, applyMiddleware(thunk));
            const data = response[0];
            const context = { data };
            const html = renderToString(
                <Provider store={store}>
                    <StaticRouter location={req.url} context={context}>
                        {renderRoutes(Routes)}
                    </StaticRouter>
                </Provider>
            );
            const preloadedState = {
                id: data.id,
                name: data.name,
                cover_url: data.cover_url
            };

            res.set('Cache-Control', 'public, max-age=600, s-maxage=1200');
            res.send(renderHtml(html, preloadedState));
        })
        .catch(() => {
            res.status(500).send('Oops, better luck next time!');
        });
};