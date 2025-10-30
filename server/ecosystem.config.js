// PM2 ecosystem configuration for production deployment
module.exports = {
  apps: [{
    name: 'webhaze-server',
    script: './index.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'development',
      PORT: 4000
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 4000
    },
    // Logging
    log_file: './logs/combined.log',
    out_file: './logs/out.log',
    error_file: './logs/error.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    
    // Auto restart
    watch: false,
    ignore_watch: ['node_modules', 'logs'],
    
    // Memory and CPU limits
    max_memory_restart: '1G',
    
    // Graceful shutdown
    kill_timeout: 5000,
    
    // Health monitoring
    min_uptime: '10s',
    max_restarts: 10,
    
    // Advanced features
    merge_logs: true,
    time: true
  }]
};