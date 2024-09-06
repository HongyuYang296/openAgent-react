// src/components/ContactForm.tsx
import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  TextField,
  Grid,
  Button,
  Card,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText
} from '@mui/material';
import { allCountries } from 'country-telephone-data';
import { formatDate } from '../untils/dateUtils';

interface ContactFormValues {
  firstName: string;
  lastName: string;
  email: string;
  countryCode: string;
  phone: string | undefined;
  additionalInfo?: string;
  time: string;
}

const validationSchema = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Enter a valid email').required('Email is required'),
  countryCode: yup.string().required('CountryCode is required'),
  phone: yup.string().required('Phone number is required').matches(/^\d+$/, 'Phone number must contain only digits'), // Ensure only digits are allowed
  additionalInfo: yup.string()
});

const ContactForm: React.FC = () => {
  const formik = useFormik<ContactFormValues>({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      countryCode: '',
      phone: '',
      additionalInfo: '',
      time: ''
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      const combinedPhone = `${values.countryCode} ${values.phone}`;
      const currentTime = formatDate(new Date());

      const submissionData = {
        ...values,
        phone: combinedPhone,
        time: currentTime
      };

      console.log(submissionData);
    }
  });

  return (
    <Card
      sx={{
        padding: '30px',
        marginTop: '40px',
        backgroundColor: 'transparent',
        boxShadow: 'none',
        border: 'none'
      }}
    >
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="firstName"
              name="firstName"
              label="First Name"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              error={formik.touched.firstName && Boolean(formik.errors.firstName)}
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="lastName"
              name="lastName"
              label="Last Name"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              {' '}
              {/* Add a Grid container here */}
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth error={formik.touched.countryCode && Boolean(formik.errors.countryCode)}>
                  <InputLabel>Country Code</InputLabel>
                  <Select
                    label="Country Code"
                    value={formik.values.countryCode}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur} // Important for tracking "touched"
                    inputProps={{ name: 'countryCode', id: 'countryCode' }}
                    renderValue={selectedValue => `+ ${selectedValue}`}
                  >
                    {allCountries.map(country => (
                      <MenuItem key={`${country.dialCode}-${country.name}`} value={country.dialCode}>
                        {country.name} ({country.dialCode})
                      </MenuItem>
                    ))}
                  </Select>
                  {formik.touched.countryCode && formik.errors.countryCode && (
                    <FormHelperText>{formik.errors.countryCode}</FormHelperText> // Display the error message
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={8}>
                <TextField
                  fullWidth
                  label="Phone"
                  id="phone"
                  name="phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  error={formik.touched.phone && Boolean(formik.errors.phone)}
                  helperText={formik.touched.phone && formik.errors.phone}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              id="additionalInfo"
              name="additionalInfo"
              label="Additional Info"
              multiline
              rows={4}
              value={formik.values.additionalInfo}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              color="primary"
              variant="contained"
              fullWidth
              type="submit"
              sx={{
                height: '56px', // Increases the height of the button
                backgroundColor: 'black', // Sets the background color to black
                color: 'white', // Ensures the text color is white
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.8)' // Darkens the button on hover
                }
              }}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Card>
  );
};

export default ContactForm;
