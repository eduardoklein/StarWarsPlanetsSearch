import PropTypes from 'prop-types';
import { createContext, useEffect, useState } from 'react';

export const PlanetsContext = createContext();

export function PlanetsProvider({ children }) {
  const [planets, setPlanets] = useState([]);

  function deleteResidents(data) {
    const planetsWithoutResidents = data.map((planet) => {
      delete planet.residents;
      return planet;
    });
    console.log(planetsWithoutResidents);
    return planetsWithoutResidents;
  }

  useEffect(() => {
    fetch('https://swapi.dev/api/planets')
      .then((response) => response.json())
      .then((data) => {
        setPlanets(deleteResidents(data.results));
      });
  }, []);

  return (
    <PlanetsContext.Provider value={ { planets } }>
      {children}
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
