const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

const email = process.argv[2];

if (!email) {
  console.error('Please provide an email address: node makeAdmin.js user@example.com');
  process.exit(1);
}

const makeAdmin = async () => {
  try {
    const MONGO_URI = process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/webhaze';
    await mongoose.connect(MONGO_URI);
    
    const user = await User.findOne({ email: email.toLowerCase() });
    
    if (!user) {
      console.error(`User with email ${email} not found.`);
      process.exit(1);
    }
    
    user.role = 'admin';
    await user.save();
    
    console.log(`Success! User ${email} is now an administrator.`);
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

makeAdmin();
