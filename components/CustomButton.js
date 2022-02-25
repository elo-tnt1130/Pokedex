import { StyleSheet, Button } from "react-native";

export default function CustomButton(props) {

  const {text, color, displayColor, ...restProps } = props

  console.log(text, color)
  
  return (
    <Button
        onPress={()=> displayColor(color)}
        title={text}
        color={color}
        accessibilityLabel={text}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
