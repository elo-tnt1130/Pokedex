import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList, View, Image } from "react-native";
import { retrieveData } from "../utils/localStorage";
import PokemonCard from "../components/PokemonCard";

export default function Team(props) {
  const { route, navigation, ...restProps } = props;

  const [team, setTeam] = useState([]);

  useEffect(() => {
    
    retrieveData("Team").then((res) => {
      if (res) {
        let datas = JSON.parse(res);
        setTeam(datas);
      }
    });

  }, []);

  return (
    <>
      <View style={styles.container}>
        <FlatList
          data={team}
          numColumns={3}
          renderItem={({ item }) => (
            <PokemonCard name={item.name} url={"https://pokeapi.co/api/v2/pokemon/"+item.id } navigation={navigation}/>
          )}
          keyExtractor={(item) => item.name}
          style={styles.list}
          onEndReachedThreshold={0.5}
        />
      </View>
      <StatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    alignItems: "center",
  },
});
