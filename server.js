const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = Number(process.env.PORT) || 3000;
const ROOT_DIR = __dirname;
const NEWS_SOURCE_URL = 'https://inshorts.deta.dev/news?category=all';
const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.svg': 'image/svg+xml'
};

function sendJson(response, statusCode, body) {
    response.writeHead(statusCode, {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-store'
    });
    response.end(JSON.stringify(body));
}

async function sendLiveNews(response) {
    try {
        const sourceResponse = await fetch(NEWS_SOURCE_URL, {
            headers: { Accept: 'application/json' },
            signal: AbortSignal.timeout(8000)
        });

        if (!sourceResponse.ok) {
            throw new Error(`News source returned HTTP ${sourceResponse.status}`);
        }

        const data = await sourceResponse.json();
        sendJson(response, 200, data);
    } catch (error) {
        console.error('Live news proxy failed:', error.message);
        sendJson(response, 502, {
            success: false,
            error: 'Live news is temporarily unavailable.'
        });
    }
}

function serveStaticFile(requestPath, response) {
    const requestedPath = requestPath === '/' ? '/index.html' : requestPath;
    const filePath = path.resolve(ROOT_DIR, `.${requestedPath}`);

    if (!filePath.startsWith(ROOT_DIR) || !fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
        response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        response.end('Not found');
        return;
    }

    const extension = path.extname(filePath).toLowerCase();
    response.writeHead(200, {
        'Content-Type': MIME_TYPES[extension] || 'application/octet-stream',
        'Cache-Control': 'no-cache'
    });
    fs.createReadStream(filePath).pipe(response);
}

const server = http.createServer((request, response) => {
    const requestUrl = new URL(request.url, `http://${request.headers.host}`);

    if (request.method === 'GET' && requestUrl.pathname === '/api/news') {
        sendLiveNews(response);
        return;
    }

    if (request.method === 'GET') {
        serveStaticFile(decodeURIComponent(requestUrl.pathname), response);
        return;
    }

    response.writeHead(405, { Allow: 'GET' });
    response.end('Method not allowed');
});

server.listen(PORT, () => {
    console.log(`SmartFarm AI running at http://localhost:${PORT}`);
    console.log(`Live news endpoint: http://localhost:${PORT}/api/news`);
});
