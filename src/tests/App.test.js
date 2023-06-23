import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { PlanetsProvider } from '../context/PlanetsContext';
import testData from '../../cypress/mocks/testData';
import { act } from 'react-dom/test-utils';

describe('I am your test', () => {
  beforeEach(() => {
  jest.spyOn(global, 'fetch');
  global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(testData),
  });
  });

  afterEach(() => {
  jest.restoreAllMocks();
  });

  test('renderiza o header do componente App corretamente', () => {
  render(
    <PlanetsProvider>
      <App />
    </PlanetsProvider>
  );
    const filtroLabel = screen.getByText(/filtro:/i)
    expect(filtroLabel).toBeInTheDocument();
    const filtroInput = screen.getByRole('textbox', {
      name: /filtro:/i
    })
    expect(filtroInput).toBeInTheDocument();
    const numberLabel = screen.getByText(/número/i)
    expect(numberLabel).toBeInTheDocument();
    const numberInput = screen.getByRole('spinbutton', {
      name: /número/i
    })
    expect(numberInput).toBeInTheDocument();
    const filterButton = screen.getByRole('button', {
      name: /filtrar/i
    })
    expect(filterButton).toBeInTheDocument();
    const removeAllFiltersButton = screen.getByRole('button', {
      name: /remover filtros/i
    })
    expect(removeAllFiltersButton).toBeInTheDocument();
    const loading = screen.getByText(/loading\.\.\./i)
    expect(loading).toBeInTheDocument();
  });

  test('testa se table é carregado', async () => {
  render(
    <PlanetsProvider>
      <App />
    </PlanetsProvider>
  );

  expect(fetch).toHaveBeenCalled();
  const tatooine = await screen.findByText('Tatooine');
  expect(tatooine).toBeInTheDocument();
  const alderaan = await screen.findByText('Alderaan');
  expect(alderaan).toBeInTheDocument();
  const yavin = await screen.findByText('Yavin IV');
  expect(yavin).toBeInTheDocument();
  const hoth = await screen.findByText('Hoth');
  expect(hoth).toBeInTheDocument();
  const dagobah = await screen.findByText('Dagobah');
  expect(dagobah).toBeInTheDocument();
  const bespin = await screen.findByText('Bespin');
  expect(bespin).toBeInTheDocument();
  const endor = await screen.findByText('Endor');
  expect(endor).toBeInTheDocument();
  const naboo = await screen.findByText('Naboo');
  expect(naboo).toBeInTheDocument();
  const coruscant = await screen.findByText('Coruscant');
  expect(coruscant).toBeInTheDocument();
  const kamino = await screen.findByText('Kamino');
  expect(kamino).toBeInTheDocument();
  const table = screen.getByRole('table');
  expect(table).toBeInTheDocument();
  expect(fetch).toHaveBeenCalled();
  const nameTh = screen.getByRole('columnheader', {
    name: /nome/i
  })
  expect(nameTh).toBeInTheDocument();
  });

  test('filtra corretamente quando o usuário digita no input com maior que selecionado', async () => {
  render(
    <PlanetsProvider>
      <App />
    </PlanetsProvider>
  );
  const kamino = await screen.findByText('Kamino');
  const tatooine = await screen.findByText('Tatooine');
  act(() => {
    userEvent.type(screen.getByTestId('name-filter'), 'Tatooine');
  })
  expect(tatooine).toBeInTheDocument();
  expect(kamino).not.toBeInTheDocument();
  act(() => {
    userEvent.click(screen.getByRole('button', { name: /filtrar/i }));
    userEvent.type(screen.getByTestId('value-filter'), 10000000000);;
  })
  });

  test('filtra corretamente quando o usuário digita no input com menor que selecionado', async () => {
  render(
    <PlanetsProvider>
      <App />
    </PlanetsProvider>
  );
  const kamino = await screen.findByText('Kamino');
  const tatooine = await screen.findByText('Tatooine');
  act(() => {
    userEvent.type(screen.getByTestId('name-filter'), 'Tatooine');
    userEvent.selectOptions(screen.getByTestId('comparison-filter'), 'menor que');
  })
  expect(tatooine).toBeInTheDocument();
  expect(kamino).not.toBeInTheDocument();
  act(() => {
    userEvent.click(screen.getByRole('button', { name: /filtrar/i }));
    userEvent.type(screen.getByTestId('value-filter'), 10000000000);;
  })
  });

  test('filtra corretamente quando o usuário digita no input com igual a selecionado', async () => {
    render(
      <PlanetsProvider>
        <App />
      </PlanetsProvider>
    );
    const kamino = await screen.findByText('Kamino');
    const tatooine = await screen.findByText('Tatooine');
    act(() => {
      userEvent.type(screen.getByTestId('name-filter'), 'Tatooine');
      userEvent.selectOptions(screen.getByTestId('comparison-filter'), 'igual a');
    })
    expect(tatooine).toBeInTheDocument();
    expect(kamino).not.toBeInTheDocument();
    act(() => {
      userEvent.click(screen.getByRole('button', { name: /filtrar/i }));
      userEvent.type(screen.getByTestId('value-filter'), 10000000000);;
    })
    });

  test('filtra corretamente quando o usuário seleciona maior que', async () => {
  render(
    <PlanetsProvider>
      <App />
    </PlanetsProvider>
  );

  act(() => {
    userEvent.selectOptions(screen.getByTestId('column-filter'), 'diameter');
    userEvent.selectOptions(screen.getByTestId('comparison-filter'), 'maior que');
    userEvent.clear(screen.getByTestId('value-filter'));
    userEvent.type(screen.getByTestId('value-filter'), 400);
    userEvent.click(screen.getByTestId('button-filter'));
  })
  const tatooine = await screen.findByText('Tatooine');
  expect(tatooine).toBeInTheDocument();
});

  test('filtra corretamente quando o usuário seleciona menor que', async () => {
  render(
    <PlanetsProvider>
      <App />
    </PlanetsProvider>
  );
  act(() => {
    userEvent.selectOptions(screen.getByTestId('column-filter'), 'orbital_period');
    userEvent.selectOptions(screen.getByTestId('comparison-filter'), 'menor que');
    userEvent.clear(screen.getByTestId('value-filter'));
    userEvent.type(screen.getByTestId('value-filter'), 400);
    userEvent.click(screen.getByTestId('button-filter'));
  })
  const tatooine = await screen.findByText('Tatooine');
  expect(tatooine).toBeInTheDocument();
  });

  test('filtra corretamente quando o usuário seleciona igual a', async () => {
  render(
    <PlanetsProvider>
      <App />
    </PlanetsProvider>
  );

  act(() => {
    userEvent.selectOptions(screen.getByTestId('column-filter'), 'orbital_period');
    userEvent.selectOptions(screen.getByTestId('comparison-filter'), 'menor que');
    userEvent.clear(screen.getByTestId('value-filter'));
    userEvent.type(screen.getByTestId('value-filter'), 400);
    userEvent.click(screen.getByTestId('button-filter'));
  })
  const tatooine = await screen.findByText('Tatooine');
  expect(tatooine).toBeInTheDocument();
  });

  test('testa a exclusão de filtros individuais', () => {
  render(
    <PlanetsProvider>
      <App />
    </PlanetsProvider>
  );
  expect(fetch).toHaveBeenCalled();
  expect(fetch).toHaveBeenCalledWith('https://swapi.dev/api/planets');
  userEvent.selectOptions(screen.getByTestId('column-filter'), 'population');
  userEvent.selectOptions(screen.getByTestId('comparison-filter'), 'maior que');
  userEvent.type(screen.getByTestId('value-filter'), '10');
  userEvent.click(screen.getByTestId('button-filter'));
  const excludeFilterButton = screen.getByRole('button', {name: /x/i})
  expect(excludeFilterButton).toBeInTheDocument();
  userEvent.click(excludeFilterButton);
  });

  test('testa a exclusão de todos filtros', () => {
  render(
    <PlanetsProvider>
      <App />
    </PlanetsProvider>
  );
  expect(fetch).toHaveBeenCalled();
  expect(fetch).toHaveBeenCalledWith('https://swapi.dev/api/planets');
  userEvent.selectOptions(screen.getByTestId('column-filter'), 'population');
  userEvent.selectOptions(screen.getByTestId('comparison-filter'), 'maior que');
  userEvent.type(screen.getByTestId('value-filter'), '10');
  userEvent.click(screen.getByTestId('button-filter'));
  const excludeAllFilterButton = screen.getByRole('button', {name: /remover filtros/i})
  userEvent.click(excludeAllFilterButton);
  });

  test('testa o sort asc', async () => {
    render(
      <PlanetsProvider>
        <App />
      </PlanetsProvider>
    );
      const ascRadio = screen.getByRole('radio', {
        name: /ascendente/i
      })
      const sortButton = screen.getByRole('button', {name: /organizar/i})
      await screen.findByText('Tatooine');

      userEvent.selectOptions(screen.getByTestId('column-sort'), 'population');
      userEvent.click(ascRadio);
      userEvent.click(sortButton);
    });

    test('testa o sort desc', async () => {
      render(
        <PlanetsProvider>
          <App />
        </PlanetsProvider>
      );
        const ascRadio = screen.getByRole('radio', {
          name: /descendente/i
        })
        const sortButton = screen.getByRole('button', {name: /organizar/i})
        await screen.findByText('Tatooine');
  
        userEvent.selectOptions(screen.getByTestId('column-sort'), 'population');
        userEvent.click(ascRadio);
        userEvent.click(sortButton);
      });
});

