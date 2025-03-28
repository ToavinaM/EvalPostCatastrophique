# Utilisation de Node.js
FROM node:18

# Définition du répertoire de travail
WORKDIR /app

# Copie des fichiers
COPY package*.json ./
RUN npm install

# Copie du code source
COPY . .

# Exposition du port
EXPOSE 5000

# Commande de lancement
CMD ["node", "server.js"]
