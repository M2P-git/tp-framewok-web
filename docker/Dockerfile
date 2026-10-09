# La « machine » de travail du cours : Node.js 24 (LTS), npm, Git, et quelques outils.
#
# Un Dockerfile est une RECETTE : chaque ligne ajoute une couche à une image.
# L'image obtenue sert ensuite de modèle pour créer des conteneurs (les « machines »).
# Elle se construit avec :  docker compose up -d --build   (voir docker-compose.yml)

# 1. Le point de départ : une image officielle avec Node.js 24 et npm, sur Debian allégé.
FROM node:24-bookworm-slim

# 2. Les outils du quotidien, installés une fois pour toutes :
#    git (cloner, valider), curl (tester l'API), nano (éditer un fichier dans le terminal),
#    procps (la commande « ps »), ca-certificates (les connexions HTTPS).
#    Le « rm -rf » final supprime la liste des paquets pour garder l'image légère.
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        git curl nano procps ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# 3. Git refuse parfois un dossier partagé qui appartient à un autre utilisateur :
#    on lui dit que /tp (le dépôt monté par docker-compose.yml) est de confiance.
RUN git config --system --add safe.directory /tp

# 4. Le dossier dans lequel s'ouvre le terminal : c'est votre dépôt, partagé avec votre ordinateur.
WORKDIR /tp
