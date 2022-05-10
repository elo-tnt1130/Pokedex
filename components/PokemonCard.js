import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import { getPokemon } from "../API/PokeApi";
import { useState, useEffect } from "react";

export default function PokemonCard(props) {
  const { url, name, navigation, ...restProps } = props;

  const [pokemonData, setPokemonData] = useState([]);
  const [pokemonImg, setPokemonImg] = useState(null);

  useEffect(() => {
    // if (pokemonData.length === 0) {
      getPokemon(url).then((data) => {
        setPokemonData(data);
        getPokemon(data.forms[0].url).then((imgData) => {
          setPokemonImg(imgData.sprites);
        });
      });
    // }

  }, []);


  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate("PokemonDetailsScreen", { datas: pokemonData })
      }
    >
      <View style={styles.containerInfo}>
        <Text style={styles.pokemonName}>{name.toUpperCase()}</Text>
      </View>

      <View style={styles.containerImage}>
        {pokemonImg ? (
          <Image
            style={styles.image}
            source={{
              uri: pokemonData.sprites.other["official-artwork"].front_default,
            }}
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
  image: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  pokemonName: {
    color: "#B00A00",
    height: 20,
    textAlign: "center",
  },
});
