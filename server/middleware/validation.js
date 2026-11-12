const { body, validationResult } = require('express-validator');

const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }
  next();
};

const sanitizeString = (field) =>
  body(field).trim().escape().notEmpty().withMessage(`${field} is required`);

const validateAuth = [
  body('email').trim().toLowerCase().isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
  handleValidation,
];

const validateRegister = [
  body('name').trim().escape().isLength({ min: 2, max: 50 }).withMessage('Name must be 2-50 characters'),
  body('email').trim().toLowerCase().isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
  handleValidation,
];

const validateContact = [
  sanitizeString('name'),
  body('email').trim().toLowerCase().isEmail().withMessage('Valid email is required'),
  body('phone').trim().isMobilePhone().withMessage('Valid phone number is required'),
  sanitizeString('subject'),
  body('message').trim().isLength({ min: 10, max: 2000 }).withMessage('Message must be 10-2000 characters'),
  handleValidation,
];

const validateBooking = [
  sanitizeString('name'),
  body('email').trim().toLowerCase().isEmail().withMessage('Valid email is required'),
  body('phone').trim().isMobilePhone().withMessage('Valid phone number is required'),
  body('preferredDate').isISO8601().withMessage('Valid date is required'),
  body('preferredTime').matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).withMessage('Valid time (HH:MM) is required'),
  sanitizeString('subject'),
  body('message').trim().isLength({ min: 5, max: 2000 }).withMessage('Message must be 5-2000 characters'),
  handleValidation,
];

module.exports = { validateAuth, validateRegister, validateContact, validateBooking, handleValidation };
