// Vérifie un exercice TypeScript : le fichier doit compiler en mode strict ; s'il existe un fichier
// de tests (NN-xxx.test.ts), il est ensuite lancé avec Node.
//
// Usage :  npm run ts 3        un exercice (le numéro de 1 à 5)
//          npm run ts:tout     tous les exercices
//
// Prérequis : npm install (pour installer TypeScript). Sans installation : le TypeScript Playground
// (typescriptlang.org/play) accepte le contenu d'un fichier, en mode strict.
import { spawnSync } from 'node:child_process';
import { existsSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ici = dirname(fileURLToPath(import.meta.url));
const tsc = process.env.TSC_PATH ?? join(ici, 'node_modules', 'typescript', 'bin', 'tsc');
if (!existsSync(tsc)) {
  console.error("TypeScript n'est pas installé. Lancez d'abord : npm install");
  process.exit(2);
}

const dossier = join(ici, 'typescript');
const exercices = readdirSync(dossier)
  .filter((f) => /^\d\d-.*\.ts$/.test(f) && !f.endsWith('.test.ts'))
  .sort();

const demande = process.argv[2];
const choisis = !demande || demande === 'tout'
  ? exercices
  : exercices.filter((f) => f.startsWith(demande.padStart(2, '0') + '-'));
if (choisis.length === 0) {
  console.error(`Aucun exercice « ${demande} ». Exercices : ${exercices.map((f) => f.slice(0, 2)).join(', ')}`);
  process.exit(2);
}

let echecs = 0;
for (const fichier of choisis) {
  const chemin = join(dossier, fichier);
  const compilation = spawnSync(process.execPath, [
    tsc, '--noEmit', '--strict', '--target', 'es2022', '--module', 'nodenext', '--moduleResolution', 'nodenext',
    '--skipLibCheck', '--pretty', 'false', chemin,
  ], { encoding: 'utf8' });
  if (compilation.status !== 0) {
    echecs += 1;
    console.log(`✘ ${fichier} : ne compile pas`);
    console.log((compilation.stdout + compilation.stderr).trim().split('\n').map((l) => '    ' + l.replace(ici + '\\', '').replace(ici + '/', '')).join('\n'));
    continue;
  }
  const tests = join(dossier, fichier.replace(/\.ts$/, '.test.ts'));
  if (existsSync(tests)) {
    const essai = spawnSync(process.execPath, ['--test', tests], { encoding: 'utf8' });
    if (essai.status !== 0) {
      echecs += 1;
      console.log(`✘ ${fichier} : compile, mais un test échoue`);
      console.log((essai.stdout + essai.stderr).trim().split('\n').filter((l) => /not ok|expected|actual|Expected|^\s+[+-] /.test(l)).slice(0, 14).map((l) => '    ' + l).join('\n'));
      continue;
    }
    console.log(`✔ ${fichier} : compile, et les tests passent`);
  } else {
    console.log(`✔ ${fichier} : compile`);
  }
}
process.exit(echecs === 0 ? 0 : 1);
