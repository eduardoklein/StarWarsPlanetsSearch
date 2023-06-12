import PropTypes from 'prop-types';
import { createContext, useEffect, useState } from 'react';

export const PlanetsContext = createContext();

export function PlanetsProvider({ children }) {
  const [planets, setPlanets] = useState([]);

  const [filterInput, setFilterInput] = useState('');

  const [originalArray, setOriginalArray] = useState([]);

  const [filterByHeader, setFilterByHeader] = useState('population');
  const [moreLessEqualThan, setMoreLessEqualThan] = useState('maior que');
  const [filterByNumber, setFilterByNumber] = useState('0');

  const [filters, setFilters] = useState([]);

  function deleteResidents(data) {
    const planetsWithoutResidents = data.map((planet) => {
      delete planet.residents;
      return planet;
    });
    setOriginalArray(planetsWithoutResidents);
    return planetsWithoutResidents;
  }

  useEffect(() => {
    fetch('https://swapi.dev/api/planets')
      .then((response) => response.json())
      .then((data) => {
        setPlanets(deleteResidents(data.results));
      });
  }, []);

  const contextObj = {
    planets,
    setPlanets,
    filterInput,
    setFilterInput,
    originalArray,
    filterByHeader,
    setFilterByHeader,
    moreLessEqualThan,
    setMoreLessEqualThan,
    filterByNumber,
    setFilterByNumber,
    filters,
    setFilters,
  };

  return (
    <PlanetsContext.Provider value={ contextObj }>
      {children}
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
