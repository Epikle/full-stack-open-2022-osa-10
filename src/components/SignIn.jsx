import { Formik } from 'formik';
import { Pressable, StyleSheet, View } from 'react-native';
import { useNavigate } from 'react-router-native';
import * as yup from 'yup';

import FormikTextInput from './FormikTextInput';
import Text from './Text';
import theme from '../theme';
import useSignIn from '../hooks/useSignIn';

const initialValues = {
  username: '',
  password: '',
};

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
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
          <Pressable style={styles.btn} onPress={handleSubmit}>
            <Text fontWeight="bold" style={styles.btnText}>
              Sign in
            </Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const data = await signIn({ username, password });
      console.log(data);
      navigate('/', { replace: true });
    } catch (e) {
      console.log(e);
    }
  };

  return <Form onSubmit={onSubmit} />;
};

export default SignIn;
