const staticPath = '/public';

const renderHtml = (html, preloadedState) => {
    return `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="UTF8">
                <title>${preloadedState.title}</title>
                <link rel="stylesheet" href="${staticPath}/style.css">
                <script type="application/ld+json" data-react-helmet="true">
                {
                    "@context": "http://schema.org",
                    "@type": "WebSite",
                    "url": "http://www.example.com",
                    "name": "${preloadedState.title}",
                    "image": "${preloadedState.image}"
                }
                </script>   
            </head>
            <body>
                <div id="app">${html}</div>
                <script id="preloadedState">
                    window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
                </script>
                <script type="text/javascript" src="${staticPath}/bundle.js"></script>
            </body>
        </html>
    `;
};

export { renderHtml };