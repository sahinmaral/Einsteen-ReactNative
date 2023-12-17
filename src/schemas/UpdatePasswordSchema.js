import * as Yup from 'yup';

const UpdatePasswordSchema = Yup.object().shape({
  currentPassword: Yup.string().required('Current Password is required.'),
  newPassword: Yup.string()
    .required('New Password is required.')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
  newPasswordRepeat: Yup.string()
    .required('New Password repeat is required.')
    .oneOf([Yup.ref('newPassword'), null], 'New Passwords must match.'),
});

export default UpdatePasswordSchema;
