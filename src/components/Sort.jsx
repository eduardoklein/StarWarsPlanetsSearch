import { useContext } from 'react';
import { PlanetsContext } from '../context/PlanetsContext';

export function Sort() {
  const MINUS_ONE = -1;
  const ONE = 1;

  const { planets, setPlanets } = useContext(PlanetsContext);
  const sortObj = {
    order: {
      column: 'population',
      sort: '',
    },
  };

  function handleChange(event) {
    if (event.target.name === 'column-sort') {
      sortObj.order.column = event.target.value;
    }
    if (event.target.name === 'sort-order') {
      sortObj.order.sort = event.target.value;
    }
  }

  function sortASC(planetA, planetB) {
    const { column } = sortObj.order;
    if (planetA[column] === 'unknown') {
      return ONE;
    } if (planetB[column] === 'unknown') {
      return MINUS_ONE;
    }
    return Number(planetA[column] - planetB[column]);
  }

  function sortDESC(planetA, planetB) {
    const { column } = sortObj.order;
    if (planetB[column] === 'unknown') {
      return MINUS_ONE;
    } if (planetA[column] === 'unknown') {
      return ONE;
    }
    return Number(planetB[column] - planetA[column]);
  }

  function handleOnClick() {
    const { sort } = sortObj.order;
    const arrayPlanets = [...planets];
    const sortedPlanets = arrayPlanets.sort((planetA, planetB) => {
      if (sort === 'ASC') {
        return sortASC(planetA, planetB);
      } if (sort === 'DESC') {
        return sortDESC(planetA, planetB);
      }
      return 0;
    });
    setPlanets(sortedPlanets);
  }

  return (
    <div>
      <select
        data-testid="column-sort"
        name="column-sort"
        onChange={ handleChange }
      >
        <option>population</option>
        <option>orbital_period</option>
        <option>diameter</option>
        <option>rotation_period</option>
        <option>surface_water</option>
      </select>
      <label
        htmlFor="asc"
      >
        Ascendente
      </label>
      <input
        data-testid="column-sort-input-asc"
        id="asc"
        type="radio"
        value="ASC"
        name="sort-order"
        onChange={ handleChange }
      />
      <label
        htmlFor="desc"
      >
        Descendente
      </label>
      <input
        data-testid="column-sort-input-desc"
        id="desc"
        type="radio"
        value="DESC"
        name="sort-order"
        onChange={ handleChange }
      />
      <button
        data-testid="column-sort-button"
        onClick={ handleOnClick }
        type="button"
      >
        Organizar
      </button>
    </div>
  );
}
