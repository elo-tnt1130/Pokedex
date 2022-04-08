export function getPokemon(url = "https://pokeapi.co/api/v2/pokemon") {
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.log("error", error));
}

export function getSearchedPokemon(pokemon) {
  const url = "https://pokeapi.co/api/v2/pokemon/" + pokemon.toLowerCase();
  return fetch(url)
    .then((response) => (response.ok ? response.json() : null))
    .catch((error) => console.log("error", error));
}
