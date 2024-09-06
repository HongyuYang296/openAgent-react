import * as yup from 'yup';

// Define the validation schema for contact form
export const contactFormValidationSchema = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Enter a valid email').required('Email is required'),
  countryCode: yup.string().required('CountryCode is required'),
  phone: yup.string().required('Phone number is required').matches(/^\d+$/, 'Phone number must contain only digits'), // Ensure only digits are allowed
  additionalInfo: yup.string()
});
