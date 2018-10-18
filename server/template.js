const staticPath = '/public';

const renderHtml = (html, preloadedState) => {
    const { name, cover_url } = preloadedState;
    return `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="UTF8">
                <title>${name}</title>
                <link rel="icon" href="${staticPath}/favicon.ico" type="image/x-icon">
                <link rel="stylesheet" href="${staticPath}/style.css">
                <script type="application/ld+json" data-react-helmet="true">
                {
                    "@context": "http://schema.org",
                    "@type": "WebSite",
                    "url": "http://www.example.com",
                    "name": "${name}",
                    "image": "${cover_url}"
                }
                </script>   
            </head>
            <body>
                <div id="app">${html}</div>
                <script id="PreloadedState">
                    window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
                </script>
                <script type="text/javascript" src="${staticPath}/bundle.js"></script>
            </body>
        </html>
    `;
};

export { renderHtml };