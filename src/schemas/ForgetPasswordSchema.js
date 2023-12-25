import * as Yup from 'yup';

const ForgetPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email is required.')
    .email('Entered email is invalid.'),
});

export default ForgetPasswordSchema;
