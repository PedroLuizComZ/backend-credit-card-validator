FROM node:20

# Instala as dependências necessárias para compilar o bcrypt
RUN apt-get update && apt-get install -y \
  build-essential \
  python3 \
  && rm -rf /var/lib/apt/lists/*

# Cria o diretório da aplicação
WORKDIR /app

# Copia os arquivos package.json e package-lock.json
COPY package*.json ./

# Instala as dependências da aplicação
RUN npm ci

# Copia o restante do código
COPY . .

# Executa o build do TypeScript usando tsup
RUN npm run build

# Expõe a porta 8080
EXPOSE 8080

# Inicia a aplicação
CMD ["npm", "run", "start"]
