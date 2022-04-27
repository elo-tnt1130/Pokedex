import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, TextInput, Text, View } from "react-native";
import PokemonCard from "./PokemonCard";
import PokemonCardSearch from "./PokemonCardSearch";
import { getPokemon, getSearchedPokemon } from "../API/PokeApi";

const searchPokemonInput = (props) => {
  const [text, setText] = React.useState(null);
  const [searchedPokemon, setSearchedPokemon] = useState(null);

  const { route, navigation, ...restProps } = props;

  const handleSearchedText = () => {
    if (text) {
      getSearchedPokemon(text).then((res) => {
        setSearchedPokemon(res);
      });
    }
  };

  // useEffect(()=>{console.log('test ' + searchedPokemon);}, [])

  return (
    <>
      <View>
        <TextInput
          style={styles.input}
          onChangeText={setText}
          value={text}
          onSubmitEditing={handleSearchedText}
          placeholder="Rechercher un pokemon"
        />
      </View>
      <View>
        {searchedPokemon ? (
          <PokemonCardSearch
            data={searchedPokemon}
            // url={}
            navigation={navigation}
          />
        ) : (
          <Text>Aucun résultat</Text>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 15,
    borderRadius: 25,
  },
});

export default searchPokemonInput;
