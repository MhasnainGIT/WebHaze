const express = require('express');
const router = express.Router();

/**
 * Demo route that returns a simple HTML page and demonstrates Clarity script injection.
 * Use ?tenant=tenantA or ?tenant=tenantB to simulate tenant-level toggles.
 */
router.get('/', (req, res) => {
  const tenant = res.locals.tenant || {name: 'Unknown'};
  const scripts = res.locals.getThirdPartyScripts ? res.locals.getThirdPartyScripts() : '';

  const html = `<!doctype html>
  <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <title>${tenant.name} — Demo Site</title>
      ${scripts}
      <style>body{font-family: Arial, sans-serif;margin:32px}</style>
    </head>
    <body>
      <h1>${tenant.name} — Demo Site</h1>
      <p>This page demonstrates conditional injection of Microsoft Clarity tracking snippet per-tenant.</p>
      <p>Tenant ID: <strong>${tenant.id || 'unknown'}</strong></p>
      <p>Clarity enabled: <strong>${tenant.analytics && tenant.analytics.clarity && tenant.analytics.clarity.enabled ? 'yes' : 'no'}</strong></p>
      <p>Try <a href="?tenant=tenantA">tenantA</a> or <a href="?tenant=tenantB">tenantB</a></p>
    </body>
  </html>`;

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(html);
});

module.exports = router;
