# Verwende das offizielle Node.js-Image als Basis
FROM node

# Setze das Arbeitsverzeichnis im Container
WORKDIR /usr/src/app

# Kopiere die package.json und package-lock.json in das Arbeitsverzeichnis
COPY package*.json ./

# Installiere die Abhängigkeiten
RUN npm install

# Kopiere den restlichen Anwendungscode in das Arbeitsverzeichnis
COPY . .

# Exponiere den Port, auf dem deine Anwendung lauscht
EXPOSE 3000

# Starte die Anwendung beim Starten des Containers
CMD [ "node", "app.js" ]
