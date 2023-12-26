import * as Yup from 'yup';

const LoginUserSchema = Yup.object().shape({
  email: Yup.string()
  .required('Email is required.')
    .email('Entered email is invalid.'),
  password: Yup.string()
    .required('Password is required.')
});

export default LoginUserSchema;
