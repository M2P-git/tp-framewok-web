import { test } from 'node:test';
import assert from 'node:assert/strict';
import { creerElement, carteOffre } from './04-jsx-a-la-main.js';

test('creerElement : un enfant', () => {
  assert.deepEqual(creerElement('h3', { className: 'titre' }, 'PFE'), {
    type: 'h3',
    props: { className: 'titre', children: 'PFE' },
  });
});

test('creerElement : plusieurs enfants', () => {
  assert.deepEqual(creerElement('p', null, 'Rabat', ' · ', 'Fès'), {
    type: 'p',
    props: { children: ['Rabat', ' · ', 'Fès'] },
  });
});

test('creerElement : aucun enfant, pas de propriété children', () => {
  const element = creerElement('br', null);
  assert.deepEqual(element, { type: 'br', props: {} });
  assert.equal('children' in element.props, false);
  assert.deepEqual(creerElement('input', { type: 'text' }), { type: 'input', props: { type: 'text' } });
});

test('creerElement ne modifie pas les props reçues', () => {
  const props = Object.freeze({ id: 'x' });
  assert.deepEqual(creerElement('div', props, 'a'), { type: 'div', props: { id: 'x', children: 'a' } });
});

test('les éléments peuvent s\'imbriquer', () => {
  const arbre = creerElement('ul', null, creerElement('li', null, 'a'), creerElement('li', null, 'b'));
  assert.deepEqual(arbre, {
    type: 'ul',
    props: { children: [{ type: 'li', props: { children: 'a' } }, { type: 'li', props: { children: 'b' } }] },
  });
});

const offre = { title: 'PFE : API', companyName: 'Draa Labs', city: 'Rabat' };

test('carteOffre', () => {
  assert.deepEqual(carteOffre(offre, false), {
    type: 'article',
    props: {
      className: 'carte',
      children: [
        { type: 'h3', props: { children: 'PFE : API' } },
        { type: 'p', props: { children: 'Draa Labs · Rabat' } },
      ],
    },
  });
});

test('carteOffre d\'une offre favorite', () => {
  assert.equal(carteOffre(offre, true).props.className, 'carte est-favori');
});
