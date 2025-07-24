const express = require('express');
const path = require('path');
const app = express();

// Pega a porta do ambiente do Railway ou usa 8080 como padrão
const port = process.env.PORT || 8080;

// !! IMPORTANTE !! Verifique no seu angular.json se o outputPath
// é 'dist/vitalis'. Se for diferente, ajuste o nome aqui.
const appName = 'vitalis';

// O servidor vai "servir" os arquivos estáticos da sua aplicação Angular
app.use(express.static(__dirname + `/dist/${appName}`));

// Rota coringa com a SINTAXE CORRETA para o Express 5
// Isso garante que qualquer rota digitada no navegador carregue seu app Angular
app.get('/*:path', function(req,res) {
  res.sendFile(path.join(__dirname + `/dist/${appName}/index.html`));
});

// Inicia o servidor na porta correta
app.listen(port, () => {
  console.log(`Servidor da aplicação iniciado na porta ${port}`);
});