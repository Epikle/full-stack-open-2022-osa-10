import { Formik } from 'formik';
import { Pressable, StyleSheet, View } from 'react-native';
import { useNavigate } from 'react-router-native';
import * as yup from 'yup';

import FormikTextInput from './FormikTextInput';
import Text from './Text';
import theme from '../theme';
import useSignIn from '../hooks/useSignIn';
import useSignUp from '../hooks/useSignUp';

const initialValues = {
  username: '',
  password: '',
  passwordconfirm: '',
};

const validationSchema = yup.object().shape({
  username: yup.string().max(30).required('Username is required'),
  password: yup.string().min(5).max(50).required('Password is required'),
  passwordconfirm: yup
    .string()
    .oneOf([yup.ref('password'), null], "Passwords don't match")
    .required('Password confirmation is required'),
});

const styles = StyleSheet.create({
  form: {
    backgroundColor: 'white',
    padding: 20,
  },
  btn: {
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 5,
    backgroundColor: theme.colors.primary,
  },
  btnText: {
    color: 'white',
    textAlign: 'center',
  },
});

export const Form = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => (
        <View style={styles.form}>
          <FormikTextInput name="username" placeholder="Username" />
          <FormikTextInput
            name="password"
            placeholder="Password"
            secureTextEntry
          />
          <FormikTextInput
            name="passwordconfirm"
            placeholder="Password confirmation"
            secureTextEntry
          />
          <Pressable style={styles.btn} onPress={handleSubmit}>
            <Text fontWeight="bold" style={styles.btnText}>
              Sign up
            </Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

const SignUp = () => {
  const navigate = useNavigate();
  const [signIn] = useSignIn();
  const [signUp] = useSignUp();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const dataSignUp = await signUp({ username, password });
      const dataSignIn = await signIn({ username, password });
      console.log({ dataSignUp, dataSignIn });
      navigate('/', { replace: true });
    } catch (e) {
      console.log(e);
    }
  };

  return <Form onSubmit={onSubmit} />;
};

export default SignUp;
