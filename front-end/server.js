const express = require('express');
const path = require('path');
const app = express();

// Pega a porta do ambiente do Railway ou usa 8080 como padrão
const port = process.env.PORT || 8080;

// !! IMPORTANTE !! Verifique se o nome aqui ('vitalis') é o mesmo
// da pasta que é criada dentro de 'dist/' quando você executa 'ng build'.
const appName = 'vitalis';

// O servidor vai "servir" os arquivos estáticos da sua aplicação Angular
app.use(express.static(__dirname + `/dist/${appName}`));

// Para qualquer outra rota, ele devolve o index.html (essencial para o Angular funcionar)
app.get('/*', function(req,res) {
  res.sendFile(path.join(__dirname + `/dist/${appName}/index.html`));
});

// Inicia o servidor na porta correta
app.listen(port, () => {
  console.log(`Servidor da aplicação iniciado na porta ${port}`);
});