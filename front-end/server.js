const express = require('express');
const app = express();

// Pega a porta do ambiente do Railway ou usa 8080 como padrão
const port = process.env.PORT || 8080;

// Apenas uma rota coringa para testar.
app.get('/*', (req, res) => {
  res.send('O servidor de teste está no ar e respondendo!');
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor de teste iniciado na porta ${port}`);
});