import { join } from 'path';

const BASE_PATH = ".";

Bun.serve({
    port: 3000,
    async fetch(req) {
        const url = new URL(req.url);

        let filePath = join(BASE_PATH, url.pathname);
        if (!url.pathname || url.pathname === '/') {
            filePath = join(BASE_PATH, '/index.html');
        }

        const file = Bun.file(filePath);
        return new Response(file);
    },
    error() {
        return new Response(null, { status: 404 });
    },
});