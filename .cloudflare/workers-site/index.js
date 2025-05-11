/**
 * Basic worker script for serving a static Next.js build
 */
const { getAssetFromKV } = require('@cloudflare/kv-asset-handler')

/**
 * The DEBUG flag can be used to enable debugging
 */
const DEBUG = false

/**
 * Handle the request
 */
addEventListener('fetch', event => {
  event.respondWith(handleEvent(event))
})

async function handleEvent(event) {
  try {
    // Get the asset from KV
    let options = {}
    
    if (DEBUG) {
      options.cacheControl = {
        bypassCache: true,
      }
    }
    
    return await getAssetFromKV(event, options)
  } catch (e) {
    // If an error is thrown, serve a 404 page
    return new Response('Page not found', {
      status: 404,
      statusText: 'not found',
    })
  }
} 