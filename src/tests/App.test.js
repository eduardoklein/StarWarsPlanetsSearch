import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { PlanetsProvider } from '../context/PlanetsContext';
import { requisicaoAPI } from '../utils/requisicaoAPI';
import testData from '../../cypress/mocks/testData';

// global.fetch = jest.fn(() => Promise.resolve({
//   json: () => Promise.resolve(testData),
// }));

test('renderiza o componente App corretamente', () => {
  render(
    <PlanetsProvider>
      <App />
    </PlanetsProvider>
  );

  expect(screen.getByLabelText('Filtro:')).toBeInTheDocument();
  expect(screen.getByTestId('name-filter')).toBeInTheDocument();
  expect(screen.getByTestId('numeric-filter')).toBeInTheDocument();
  expect(screen.getByTestId('table')).toBeInTheDocument();
});

test('testando a função requisicaoAPI', async () => {
  const data = await requisicaoAPI();

  expect(data).toEqual(testData);
});

test('filtra corretamente quando o usuário digita no input', () => {
  render(
    <PlanetsProvider>
      <App />
    </PlanetsProvider>
  );

  userEvent.type(screen.getByTestId('name-filter'), 'Tatooine');
  expect(screen.getByTestId('name-filter')).toHaveValue('Tatooine');
});

test('filtra corretamente quando o usuário seleciona opções numéricas', () => {
  render(
    <PlanetsProvider>
      <App />
    </PlanetsProvider>
  );

  userEvent.selectOptions(screen.getByTestId('comparison-filter'), 'maior que');
  userEvent.type(screen.getByTestId('value-filter'), '1000');
  userEvent.click(screen.getByTestId('button-filter'));
  expect(screen.getByTestId('filter')).toHaveTextContent('population/maior que/1000');
});
