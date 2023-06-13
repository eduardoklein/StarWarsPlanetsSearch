import { useContext } from 'react';
import { PlanetsContext } from '../context/PlanetsContext';
import { Options } from './Options';

export function NumericFilter() {
  const { setFilterByHeader,
    setMoreLessEqualThan,
    setFilterByNumber,
    planets,
    setPlanets,
    filterByHeader,
    moreLessEqualThan,
    filterByNumber,
    originalArray,
    filters,
    setFilters } = useContext(PlanetsContext);

  function checkIfPlanetsMeetsFilterValue(planet) {
    if (moreLessEqualThan === 'menor que') {
      return Number(planet[filterByHeader]) < Number(filterByNumber) && planet;
    }
    if (moreLessEqualThan === 'maior que') {
      return Number(planet[filterByHeader]) > Number(filterByNumber) && planet;
    }
    if (moreLessEqualThan === 'igual a') {
      return Number(planet[filterByHeader]) === Number(filterByNumber) && planet;
    }
  }

  function handleOnClick(event) {
    event.preventDefault();
    const newPlanets = planets.filter(checkIfPlanetsMeetsFilterValue);
    const newFilter = { filterByHeader, moreLessEqualThan, filterByNumber };
    setFilters((prevFilters) => [...prevFilters, newFilter]);
    setPlanets(newPlanets);
    setFilterByHeader(newFilter[0]);
  }

  function handleOnChange(event) {
    if (event.target.name === 'column-filter') {
      setFilterByHeader(event.target.value);
    } else if (event.target.name === 'comparison-filter') {
      setMoreLessEqualThan(event.target.value);
    } else if (event.target.name === 'value-filter') {
      setFilterByNumber(event.target.value);
    }
  }

  function handleRemoveFilters(event) {
    event.preventDefault();
    setPlanets(originalArray);
    setFilters([]);
  }

  return (
    <div>
      <form>
        <select
          data-testid="column-filter"
          onChange={ handleOnChange }
          name="column-filter"
        >
          <Options />
        </select>
        <select
          data-testid="comparison-filter"
          onChange={ handleOnChange }
          name="comparison-filter"
          value={ moreLessEqualThan }
        >
          <option>maior que</option>
          <option>menor que</option>
          <option>igual a</option>
        </select>
        <label
          htmlFor="numericFilterInput"
        >
          Número

        </label>
        <input
          data-testid="value-filter"
          id="numericFilterInput"
          type="number"
          name="value-filter"
          onChange={ handleOnChange }
          value={ filterByNumber }
        />
        <button
          data-testid="button-filter"
          onClick={ handleOnClick }
        >
          Filtrar

        </button>
        { filters.length > 0 && filters.map((filter, cont) => {
          cont += 1;
          return (
            <div key={ cont } data-testid="filter">
              {filter.filterByHeader}
              /
              {filter.moreLessEqualThan}
              /
              {filter.filterByNumber}
              <button>X</button>
            </div>
          );
        }) }
        <button
          data-testid="button-remove-filters"
          onClick={ handleRemoveFilters }
        >
          Remover filtros
        </button>
      </form>
    </div>
  );
}
