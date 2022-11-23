import { TextInput as NativeTextInput, StyleSheet } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
  input: {
    marginBottom: 10,
    padding: 10,
    borderColor: theme.colors.mainBg,
    borderWidth: 1,
    borderRadius: 5,
  },
  error: {
    borderColor: theme.colors.error,
  },
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = error
    ? [style, styles.input, styles.error]
    : [style, styles.input];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;
