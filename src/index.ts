export default {
  async fetch(request, env, ctx): Promise<Response> {
    const logEntry = {
      method: request.method,
      url: request.url,
      headers: Object.fromEntries(request.headers.entries()),
      body: await request.text(),
      timestamp: new Date().toISOString(),
    }
    const key = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
    await env.WEBHOOK_LOG.put(key, JSON.stringify(logEntry))
    return new Response("OK")
  },
} satisfies ExportedHandler<Env>
