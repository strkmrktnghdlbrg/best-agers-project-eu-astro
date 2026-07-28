/**
 * Cloudflare Pages Middleware.
 *
 * Zweck: www -> Apex per 301. Die Regel steht auch in public/.htaccess, aber
 * Cloudflare Pages ist kein Apache und ignoriert die Datei komplett – ohne
 * dieses Middleware liefern www und Apex beide HTTP 200 und damit Duplicate
 * Content. Der Canonical im <head> zeigt zwar auf den Apex, ein harter 301 ist
 * aber der Portfolio-Standard.
 *
 * Query-String und Pfad bleiben erhalten, damit /go/?u=… nicht bricht.
 */
export async function onRequest(context) {
  const url = new URL(context.request.url);

  if (url.hostname === "www.homotox.de") {
    url.hostname = "homotox.de";
    return Response.redirect(url.toString(), 301);
  }

  return context.next();
}
