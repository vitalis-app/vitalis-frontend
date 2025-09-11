//sitemap para o google search console
// Importa as funções necessárias do pacote 'sitemap'
const { SitemapStream, streamToPromise } = require('sitemap');
const { Readable } = require('stream');
const fs = require('fs');

// Lista CORRETA de todas as páginas públicas do seu site.
const routes = [
  '/',
  '/funcionalidades',
  '/para-especialistas',
  '/planos',
  '/sobre',
  '/auth/login'
  // Lembre-se de adicionar '/auth/cadastro' aqui quando a rota existir.
];

// O domínio principal do seu site.
const hostname = 'https://mentalvitalis.com.br';

// Cria um stream a partir da nossa lista de rotas
const links = routes.map(route => ({ url: route, changefreq: 'weekly', priority: 0.8 }));
const stream = new SitemapStream({ hostname });

// Converte o sitemap para uma string e o salva no arquivo
streamToPromise(Readable.from(links).pipe(stream)).then((data) => {
  fs.writeFileSync('src/sitemap.xml', data.toString());
  console.log('sitemap.xml gerado com sucesso!');
}).catch((error) => {
  console.error('Erro ao gerar o sitemap:', error);
});

