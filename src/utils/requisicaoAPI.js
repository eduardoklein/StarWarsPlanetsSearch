export async function requisicaoAPI() {
  const response = await fetch('https://swapi.dev/api/planets');
  const data = await response.json();
  const dataMinusResidents = data.results.map((planet) => {
    delete planet.residents;
    return planet;
  });
  return dataMinusResidents;
}
