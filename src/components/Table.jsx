import { useContext, useEffect, useState } from 'react';
import { PlanetsContext } from '../context/PlanetsContext';

export function Table() {
  const { planets,
    setPlanets,
    filterInput } = useContext(PlanetsContext);
  const [doesPlanetsExist, setDoesPlanetsExist] = useState(false);

  useEffect(() => {
    if (planets.length > 0) {
      setDoesPlanetsExist(true);
    }
  }, [planets]);

  useEffect(() => {
    const newPlanets = planets.filter((element) => element.name.includes(filterInput));
    setPlanets(newPlanets);
  }, [filterInput, setPlanets]);

  return (
    <div>
      {!doesPlanetsExist ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Período de Rotação</th>
              <th>Período Orbital</th>
              <th>Diâmetro</th>
              <th>Clima</th>
              <th>Gravidade</th>
              <th>Terreno</th>
              <th>Água da Superfície</th>
              <th>População</th>
              <th>Filmes</th>
              <th>Criado</th>
              <th>Editado</th>
              <th>URL</th>
            </tr>
          </thead>
          <tbody>
            {planets.map((planet) => (
              <tr key={ planet.diameter }>
                <td data-testid="planet-name">{planet.name}</td>
                <td>{planet.rotation_period}</td>
                <td>{planet.orbital_period}</td>
                <td>{planet.diameter}</td>
                <td>{planet.climate}</td>
                <td>{planet.gravity}</td>
                <td>{planet.terrain}</td>
                <td>{planet.surface_water}</td>
                <td>{planet.population}</td>
                <td>{planet.films.join(', ')}</td>
                <td>{planet.created}</td>
                <td>{planet.edited}</td>
                <td>{planet.url}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
