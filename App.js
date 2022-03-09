import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList, Text, View, Image } from "react-native";
import CustomButton from "./components/CustomButton";
import { getPokemon } from "./API/PokeApi";
const image = {
  uri: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Forig07.deviantart.net%2F1e35%2Ff%2F2014%2F072%2Fa%2Ff%2Fumbreon_running__gif_animation__by_krazeeladee-d7a2fba.gif&f=1&nofb=1",
};
// const image = { uri: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.smogon.com%2Fforums%2Fattachments%2Fleafeon-gif.288552%2F&f=1&nofb=1'};

export default function App() {
  // const displayColor = (color) =>{
  //   console.log(color)
  // };

  const [listPokemon, setListPokemon] = useState([]);
  const [nextPage, setNextPage] = useState("https://pokeapi.co/api/v2/pokemon")

  useEffect(()=> {
    loadPokemon(nextPage)
  }, [])

  const loadPokemon = (url) => {
    getPokemon(url).then(datas => {
      setListPokemon([...listPokemon, ...datas.results])
      setNextPage(datas.next)
    })
  }

  // useEffect(() => {
  //   getPokemon().then((datas) => {
  //     console.log(datas);
  //     setListPokemon(datas.results);
  //   });
  // }, []); // [] pour éviter une requête à l'infini

  const [textParent, setTextParent] = useState("Default");
  useEffect(() => {
    console.log("Composant chargé");
  });

  const Item = ({ title, url }) => (
    <View style={styles.item}>
      {/* <Image source={{ uri: url }} resizeMode="contain" style={styles.image} /> */}
      <Text style={styles.pokemon}>{title}</Text>
    </View>
  );
  const renderItem = ({ item }) => <Item title={item.name} url={item.url} />;

  return (
    // possible d'utiliser le useState et le setTextParent avec des URLs pour afficher des images en lieu et place du nom de la couleur
    <>
      <Image source={image} resizeMode="contain" style={styles.image}></Image>
      <View style={styles.container}>
        <Text style={styles.baseText}>POKEDEX</Text>
        <Text>{textParent}</Text>
        {/* <CustomButton
          color={"red"}
          text={"NOCTALI"}
          setTextParent={setTextParent}
        />

        <CustomButton
          color={"lightgreen"}
          text={"MENTALI"}
          setTextParent={setTextParent}
        />
        <CustomButton
          color={"turquoise"}
          text={"EVOLI"}
          setTextParent={setTextParent}
        /> */}

        <FlatList
          data={listPokemon}
          renderItem={renderItem}
          keyExtractor={(item) => item.name}
          // numColumns={3}
          style={styles.list}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            loadPokemon(nextPage)
            console.log("end");
          }}
        />

        {/* <FlatList
          data={[
            {key: 'Evoli'},
            {key: 'Mentali'}, 
            {key: 'Noctali'}
          ]}
          renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
        /> */}
      </View>
      <StatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    alignItems: "center",
    // justifyContent: 'center',
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  baseText: {
    fontSize: 24,
    lineHeight: 50,
    fontWeight: "bold",
    textAlign: "center",
  },
  pokemon: {
    color: "orange",
  },
});
