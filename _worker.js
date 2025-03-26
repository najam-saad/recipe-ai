export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // This fixes a bug with Next.js static asset loading
    if (url.pathname.startsWith('/_next/static/')) {
      url.pathname = `/static${url.pathname.replace('/_next/static/', '/')}`;
      return fetch(new Request(url, request));
    }

    try {
      // Try to serve the file as-is first
      return await env.ASSETS.fetch(request);
    } catch (e) {
      // If that fails, try to serve the index (for SPA navigation)
      try {
        const indexRequest = new Request(`${url.origin}/index.html`, request);
        return await env.ASSETS.fetch(indexRequest);
      } catch (e) {
        return new Response('Not Found', { status: 404 });
      }
    }
  }
}; 