/**
 * clarityInjector middleware
 * - Attaches a helper to res.locals that templates can use to include third-party scripts
 * - Resolves tenant config (in-memory for demo) and attaches clarity snippet if allowed
 */
const tenants = require('../data/tenants');

function getClaritySnippet(clarityId) {
  if (!clarityId) return '';
  return `<!-- Microsoft Clarity -->
<script type="text/javascript">
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "${clarityId}");
</script>
<!-- End Microsoft Clarity -->`;
}

module.exports = function clarityInjector() {
  return function (req, res, next) {
    // For demo purposes, resolve tenant from query param ?tenant=tenantA
    const tenantId = (req.query && req.query.tenant) || 'tenantA';
    const tenant = tenants[tenantId] || tenants['tenantA'];

    res.locals.tenant = tenant;
    res.locals.getThirdPartyScripts = function () {
      // Respect tenant-level opt-in/opt-out and region privacy rules
      const scripts = [];
      if (tenant && tenant.analytics && tenant.analytics.clarity && tenant.analytics.clarity.enabled) {
        scripts.push(getClaritySnippet(tenant.analytics.clarity.projectId));
      }
      return scripts.join('\n');
    };

    next();
  };
};
