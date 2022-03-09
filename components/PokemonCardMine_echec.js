import { StyleSheet, View, ScrollView, Image } from "react-native";
import { Card, Text, Button, Icon } from "react-native-elements";
import { TouchableOpacity } from "react-native-web";
import { getPokemon } from "../API/PokeApi";

export default function PokemonCard(props) {
  const { url, name, ...restProps } = props;

  const [pokemonDatas, setPokemonDatas] = useState([]);
  const [pokemonImg, setPokemonImg] = useState(null);

  if (pokemonDatas.lenghh === 0) {
    getPokemon(url).then((data) => {
      setPokemonDatas(data);
      getPokemon(data.forms[0].url).then((imgData) => {
        setPokemonImg(imgData.sprites);
      });
    });
  }

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => console.log("navigate")}
    >
      <Card>
        <Card.Title style={styles.title}>pokemonDatas.name</Card.Title>

        <Card.Divider />

        {pokemonImg ? (
          <Card.Image
            style={styles.image}
            source={{ uri: pokemonImg.front_default }}
          />
        ) : (
          <Card.Image
            style={styles.image}
            source={{
              uri: "https://www.freepngimg.com/thumb/pokemon/20708-7-pokeball-hd.png",
            }}
            // source={{ uri: "https://c.tenor.com/8sTMqGWjYAQAAAAC/ball-pokemon.gif" }}
          />
        )}

        {/* <Text></Text> */}

        <Button
          icon={
            <Icon name="eye" color="#ffffff" iconStyle={{ marginRight: 10 }} />
          }
          buttonStyle={{
            borderRadius: 0,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0,
          }}
          title="VIEW MORE"
        />
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "orange",
  }, 
  image: {
    padding: 0,
  }
});
