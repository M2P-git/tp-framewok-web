import { test } from 'node:test';
import assert from 'node:assert/strict';
import { ENIGMES, PREDICTIONS } from './04-predire.js';

const attendre = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function executer(enigme) {
  const sorties = [];
  enigme((x) => sorties.push(x));
  await attendre(30); // le temps que tout se termine
  return sorties;
}

for (const numero of Object.keys(ENIGMES)) {
  test(`énigme ${numero}`, async () => {
    const reel = await executer(ENIGMES[numero]);
    const prediction = PREDICTIONS[numero] ?? [];
    assert.equal(
      JSON.stringify(prediction),
      JSON.stringify(reel),
      prediction.length === 0
        ? `Énigme ${numero} : écrivez votre prédiction dans PREDICTIONS[${numero}].`
        : `Énigme ${numero} : votre prédiction ne correspond pas. Redessinez la pile et les deux files, étape par étape.`,
    );
  });
}
