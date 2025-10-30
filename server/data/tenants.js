/**
 * In-memory tenant configs for demo purposes.
 * In a real system this would come from a database with tenant-specific overrides, region settings, and privacy flags.
 */
module.exports = {
  tenantA: {
    id: 'tenantA',
    name: 'Demo Tenant A',
    region: 'US',
    analytics: {
      clarity: {
        enabled: true,
        projectId: 'abcd1234' // placeholder
      }
    }
  },
  tenantB: {
    id: 'tenantB',
    name: 'Privacy First Tenant',
    region: 'EU',
    analytics: {
      clarity: {
        enabled: false,
        projectId: ''
      }
    }
  }
};
