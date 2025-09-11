# Estágio 1: Build
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Estágio 2: Serve
FROM nginx:alpine

# Copia os arquivos do site
COPY --from=build /app/dist/vitalis /usr/share/nginx/html

# Copia o template de configuração do Nginx
COPY default.conf.template /etc/nginx/conf.d/default.conf.template

# Copia o script de inicialização
COPY entrypoint.sh /entrypoint.sh

# Dá permissão de execução para o script
RUN chmod +x /entrypoint.sh

# Expõe a porta 80 (o Railway vai mapear isso para a porta correta)
EXPOSE 80

# Define o script como o comando de inicialização do container
ENTRYPOINT ["/entrypoint.sh"]