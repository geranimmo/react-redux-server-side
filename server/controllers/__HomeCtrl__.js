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

module.exports = (req, res) => {
    const store = createStore(reducers, {}, applyMiddleware(thunk));
    
    const html = renderToString(
        <Provider store={store}>
            <StaticRouter location={req.url} context={{}}>
                {renderRoutes(Routes)}
            </StaticRouter>
        </Provider>
    );

    const preloadedState = {
        name: 'HOME | React Redux Server Side Render',
        cover_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThFzbVT9vuJj7b1LZbFBsQue6yaG8U4LrEg2fAr6T8KzivlYb4'
    };

    res.set('Cache-Control', 'public, max-age=600, s-maxage=1200');
    res.send(renderHtml(html, preloadedState));
};