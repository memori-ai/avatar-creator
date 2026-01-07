import { serve } from 'bun'
import preview from '../preview/index.html'

import '@memori.ai/memori-react/dist/styles.css'

const server = serve({
  development: {
    hmr: true,
    console: true,
  },
  routes: {
    '/': preview,
  },
  // Fallback for unmatched routes
  fetch(_req) {
    return new Response('Not Found', { status: 404 })
  },
})

console.log(`🚀 Server running on ${server.url}`)
