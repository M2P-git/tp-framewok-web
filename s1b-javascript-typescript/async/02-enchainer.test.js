import { test } from 'node:test';
import assert from 'node:assert/strict';
import { chargerOffreEtEntreprise, chargerOuDefaut } from './02-enchainer.js';

const attendre = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function fabriquerApi({ offreEnPanne = false } = {}) {
  const appels = [];
  return {
    appels,
    async offre(id) {
      appels.push(`offre ${id}`);
      await attendre(5);
      if (offreEnPanne) throw new Error('Offre introuvable (404)');
      return { id, title: 'PFE : API', companyId: 'c-9' };
    },
    async entreprise(id) {
      appels.push(`entreprise ${id}`);
      await attendre(5);
      return { id, name: 'Draa Labs' };
    },
  };
}

test('chargerOffreEtEntreprise complète l\'offre', async () => {
  const api = fabriquerApi();
  const resultat = await chargerOffreEtEntreprise('o-1', api);
  assert.deepEqual(resultat, {
    id: 'o-1',
    title: 'PFE : API',
    companyId: 'c-9',
    entreprise: { id: 'c-9', name: 'Draa Labs' },
  });
});

test('l\'entreprise est demandée APRÈS l\'offre, avec companyId', async () => {
  const api = fabriquerApi();
  await chargerOffreEtEntreprise('o-1', api);
  assert.deepEqual(api.appels, ['offre o-1', 'entreprise c-9']);
});

test('si l\'offre échoue, l\'erreur est transmise et l\'entreprise n\'est pas demandée', async () => {
  const api = fabriquerApi({ offreEnPanne: true });
  await assert.rejects(() => chargerOffreEtEntreprise('o-1', api), { message: 'Offre introuvable (404)' });
  assert.deepEqual(api.appels, ['offre o-1']);
});

test('chargerOuDefaut renvoie l\'offre quand tout va bien', async () => {
  const offre = await chargerOuDefaut('o-1', fabriquerApi(), null);
  assert.equal(offre.title, 'PFE : API');
});

test('chargerOuDefaut renvoie la valeur par défaut en cas d\'échec', async () => {
  const resultat = await chargerOuDefaut('o-1', fabriquerApi({ offreEnPanne: true }), { title: 'indisponible' });
  assert.deepEqual(resultat, { title: 'indisponible' });
});
