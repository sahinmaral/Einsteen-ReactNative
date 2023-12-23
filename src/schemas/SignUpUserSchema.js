import * as Yup from 'yup';

const SignUpUserSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('First name is required.')
    .min(2, 'First name must be at least 2 characters')
    .max(30, 'First name must be at most 30 characters'),
  lastName: Yup.string()
    .required('Last name is required.')
    .min(2, 'Last name must be at least 2 characters')
    .max(30, 'Last name must be at most 30 characters'),
  email: Yup.string()
    .required('Email is required.')
    .email('Entered email is invalid.'),
  password: Yup.string()
    .required('Password is required.')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
  passwordRepeat: Yup.string()
    .required('Password repeat is required.')
    .oneOf([Yup.ref('password'), null], 'Passwords must match.'),
});

export default SignUpUserSchema;
