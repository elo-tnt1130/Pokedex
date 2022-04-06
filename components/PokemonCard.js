import {
  StyleSheet,
  View,
  Image,
  Text,
  Button,
  TouchableOpacity,
} from "react-native";
import { getPokemon } from "../API/PokeApi";
import { useState } from "react";

export default function PokemonCard(props) {
  const { url, name, navigation, ...restProps } = props;

  const [pokemonData, setPokemonData] = useState([]);
  const [pokemonImg, setPokemonImg] = useState(null);
  // console.log(pokemonData)

  if (pokemonData.length === 0) {
    getPokemon(url).then((data) => {
      setPokemonData(data);
      getPokemon(data.forms[0].url).then((imgData) => {
        setPokemonImg(imgData.sprites);
      });
    });
    // } else {
    //   console.log('It is broken dude')
  }

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate("PokemonDetailsScreen", { datas: pokemonData })
      }
    >
      <View style={styles.containerInfo}>
        <Text style={styles.pokemonName}>{name}</Text>
      </View>

      <View style={styles.containerImage}>
        {pokemonImg ? (
          <Image
            style={styles.image}
            source={{ uri: pokemonImg.front_default }}
          />
        ) : (
          <Image
            style={styles.image}
            source={{
              uri: "https://c.tenor.com/8sTMqGWjYAQAAAAC/ball-pokemon.gif",
            }}
          />
        )}
      </View>

      {/* <View style={styles.containerButton}>
        <Button
          // icon={
          //   <Icon name="eye" color="#ffffff" iconStyle={{ marginRight: 10 }} />
          // }
          buttonStyle={{
            borderRadius: 0,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0,
          }}
          title="+"
        />
      </View> */}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "space-between",
    width: "33.33%",
    maxWidth: 200,
    height: 150,
    padding: 5,
    marginBottom: 10,
    borderRadius: 5,
  },
  containerImage: {
    height: "80%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 15,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowColor: "black",
  },
  pokemonName: {
    color: "orange",
    height: 20,
    textAlign: "center",
  },
  image: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
});
