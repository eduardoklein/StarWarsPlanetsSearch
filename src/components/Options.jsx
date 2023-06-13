import { useContext } from 'react';
import { PlanetsContext } from '../context/PlanetsContext';

export function Options() {
  const { manageOptions } = useContext(PlanetsContext);
  return manageOptions().map((element, index) => (
    <option
      key={ index }
      value={ element }
    >
      {element}
    </option>));
}
