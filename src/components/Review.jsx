import { Formik } from 'formik';
import { Pressable, StyleSheet, View } from 'react-native';
import { useNavigate } from 'react-router-native';
import * as yup from 'yup';

import FormikTextInput from './FormikTextInput';
import Text from './Text';
import theme from '../theme';
import useReview from '../hooks/useReview';

const initialValues = {
  owner: '',
  name: '',
  rating: '',
  review: '',
};

const validationSchema = yup.object().shape({
  owner: yup.string().required('Repository owner is required'),
  name: yup.string().required('Repository name is required'),
  rating: yup
    .number()
    .typeError('Must be a number')
    .min(0)
    .max(100)
    .required('Rating is required'),
  review: yup.string(),
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
          <FormikTextInput name="owner" placeholder="Repository owner name" />
          <FormikTextInput name="name" placeholder="Repository name" />
          <FormikTextInput
            name="rating"
            placeholder="Rating between 0 and 100"
          />
          <FormikTextInput name="review" placeholder="Review" multiline />
          <Pressable style={styles.btn} onPress={handleSubmit}>
            <Text fontWeight="bold" style={styles.btnText}>
              Create a review
            </Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

const Review = () => {
  const [createReview] = useReview();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { owner, name, rating, review } = values;

    try {
      const data = await createReview({
        ownerName: owner,
        repositoryName: name,
        rating: +rating,
        text: review,
      });
      navigate(`/repository/${data.createReview.repository.id}`, {
        replace: true,
      });
    } catch (e) {
      console.log(e);
    }
  };

  return <Form onSubmit={onSubmit} />;
};

export default Review;
