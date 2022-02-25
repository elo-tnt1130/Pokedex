import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import CustomButton from "./components/CustomButton";
const image = { uri: 'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Forig07.deviantart.net%2F1e35%2Ff%2F2014%2F072%2Fa%2Ff%2Fumbreon_running__gif_animation__by_krazeeladee-d7a2fba.gif&f=1&nofb=1'};
// const image = { uri: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.smogon.com%2Fforums%2Fattachments%2Fleafeon-gif.288552%2F&f=1&nofb=1'};

export default function App() {

  const displayColor = (color) =>{
    console.log(color)
  }

  return (
    <>
      <Image source={image} resizeMode="contain" style={styles.image}></Image>
      <View style={styles.container}>
        <Text style={styles.baseText}>POKEDEX</Text>
        <CustomButton color={"red"} text={'NOCTALI'} displayColor={displayColor}/>
      
        <CustomButton color={"lightgreen"} text={"MENTALI"} displayColor={displayColor} />
        <CustomButton color={"turquoise"} text={"EVOLI"} displayColor={displayColor} />
      
      </View>
      <StatusBar style="auto" />

    </>


  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  baseText: {
    fontSize: 24,
    lineHeight: 50,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});