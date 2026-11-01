import { render, screen } from '@testing-library/react';
import App from './App';

const bulbasaur = {
  id: 1,
  name: 'bulbasaur',
  height: 7,
  weight: 69,
  types: [
    { slot: 1, type: { name: 'grass' } },
    { slot: 2, type: { name: 'poison' } },
  ],
  sprites: { other: { 'official-artwork': { front_default: 'bulbasaur.png' } } },
  stats: [
    { base_stat: 45, stat: { name: 'hp' } },
    { base_stat: 49, stat: { name: 'attack' } },
    { base_stat: 49, stat: { name: 'defense' } },
    { base_stat: 65, stat: { name: 'special-attack' } },
    { base_stat: 65, stat: { name: 'special-defense' } },
    { base_stat: 45, stat: { name: 'speed' } },
  ],
};

const bulbasaurSpecies = {
  flavor_text_entries: [
    { flavor_text: 'Une graine étrange.', language: { name: 'fr' } },
    { flavor_text: 'A strange seed was\nplanted on its\fback at birth.', language: { name: 'en' } },
  ],
  genera: [{ genus: 'Seed Pokémon', language: { name: 'en' } }],
};

const respondWith = (body) => Promise.resolve({ ok: true, status: 200, json: () => Promise.resolve(body) });

beforeEach(() => {
  global.fetch = jest.fn((url) => respondWith(url.includes('pokemon-species') ? bulbasaurSpecies : bulbasaur));
});

test('renders the navigation controls and the first Pokémon', async () => {
  render(<App />);

  expect(screen.getByRole('button', { name: 'Previous Pokémon' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Next Pokémon' })).toBeInTheDocument();
  expect(screen.getByLabelText('Pokédex number, 1 to 905')).toHaveValue(1);

  expect(await screen.findByRole('heading', { level: 1, name: /bulbasaur/i })).toBeInTheDocument();
  expect(screen.getByText('A strange seed was planted on its back at birth.')).toBeInTheDocument();
  expect(screen.getByText('Seed Pokémon')).toBeInTheDocument();
  expect(screen.getByText('318')).toBeInTheDocument();
});
