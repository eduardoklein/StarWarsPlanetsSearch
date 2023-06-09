import { useContext } from 'react';
import { PlanetsContext } from '../context/PlanetsContext';

export function NumericFilter() {
  const { setFilterByHeader,
    setMoreLessEqualThan,
    setFilterByNumber,
    planets,
    setPlanets,
    filterByHeader,
    moreLessEqualThan,
    filterByNumber,
    originalArray } = useContext(PlanetsContext);

  function checkIfPlanetsMeetsFilterValue(planet) {
    console.log(moreLessEqualThan);
    console.log(filterByHeader);
    console.log(filterByNumber);
    if (moreLessEqualThan === 'menor que') {
      console.log('entrou');
      return Number(planet[filterByHeader]) < Number(filterByNumber) && planet;
    }
    if (moreLessEqualThan === 'maior que') {
      console.log('entrou');
      return Number(planet[filterByHeader]) > Number(filterByNumber) && planet;
    }
    if (moreLessEqualThan === 'igual a') {
      console.log('entrou');
      return Number(planet[filterByHeader]) === Number(filterByNumber) && planet;
    }
  }

  function handleOnClick(event) {
    event.preventDefault();
    console.log(planets);
    const newPlanets = planets.filter(checkIfPlanetsMeetsFilterValue);
    console.log(newPlanets);

    setPlanets(newPlanets);
  }

  function handleOnChange(event) {
    setPlanets(originalArray);
    if (event.target.name === 'column-filter') {
      setFilterByHeader(event.target.value);
    } if (event.target.name === 'comparison-filter') {
      setMoreLessEqualThan(event.target.value);
    } if (event.target.name === 'value-filter') {
      setFilterByNumber(event.target.value);
    }
  }

  return (
    <div>
      <form>
        <select
          data-testid="column-filter"
          onChange={ handleOnChange }
          name="column-filter"
          value={ filterByHeader }
        >
          <option>population</option>
          <option>orbital_period</option>
          <option>diameter</option>
          <option>rotation_period</option>
          <option>surface_water</option>
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
      </form>
    </div>
  );
}
