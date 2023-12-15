import * as Yup from 'yup';

const LoginUserSchema = Yup.object().shape({
  email: Yup.string()
  .required('Email is required.')
    .email('Entered email is invalid.'),
  password: Yup.string()
    .required('Password is required.')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
});

export default LoginUserSchema;
