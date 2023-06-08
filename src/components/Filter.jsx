import { useContext } from 'react';
import { PlanetsContext } from '../context/PlanetsContext';

export function Filter() {
  const { setFilterInput, setPlanets, originalArray } = useContext(PlanetsContext);

  function handleOnChange(event) {
    setPlanets(originalArray);
    return setFilterInput(event.target.value);
  }

  return (
    <div>
      <label htmlFor="filtro">Filtro: </label>
      <input
        id="filtro"
        data-testid="name-filter"
        type="text"
        onChange={ handleOnChange }
      />
    </div>
  );
}
