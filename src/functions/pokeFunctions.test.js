import { cleanFlavorText, metricHeight, metricWeight, statBarPercent, statLabel } from './pokeFunctions';

test('cleanFlavorText removes cartridge control characters and fixes the POKéMON casing', () => {
  expect(cleanFlavorText('A strange seed was\nplanted on its\fback at birth.\fThe plant sprouts\nand grows with\nthis POKéMON.'))
    .toBe('A strange seed was planted on its back at birth. The plant sprouts and grows with this Pokémon.');
});

test('cleanFlavorText joins words split by a soft hyphen at a line end', () => {
  expect(cleanFlavorText('It can freely de­\ntach its jaw.')).toBe('It can freely detach its jaw.');
});

test('metric sizes convert decimetres and hectograms', () => {
  expect(metricHeight(7)).toBe('0.7 m');
  expect(metricWeight(69)).toBe('6.9 kg');
});

test('statLabel shortens the API names and passes unknown ones through', () => {
  expect(statLabel('special-attack')).toBe('Sp. Atk');
  expect(statLabel('hp')).toBe('HP');
  expect(statLabel('accuracy')).toBe('accuracy');
});

test('statBarPercent never exceeds a full track', () => {
  expect(statBarPercent(0)).toBe(0);
  expect(statBarPercent(300)).toBe(100);
});
