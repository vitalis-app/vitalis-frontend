#!/bin/sh
# Substitui a variável ${PORT} no template de configuração pela porta real do ambiente
envsubst '${PORT}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf
# Inicia o Nginx em primeiro plano
nginx -g 'daemon off;'