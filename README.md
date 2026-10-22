# Site oficial — Highlights Cutter

Landing page estática, responsiva e sem dependências de build. A identidade foi derivada do projeto original: fundo `#0A0C0F`, painéis grafite, texto claro, azul `#38BDF8`, ciano `#22D3EE`, Inter e JetBrains Mono.

## Executar localmente

Abra `index.html` diretamente no navegador ou, para testar por HTTP:

```powershell
cd "C:\Users\Guilherme F\Documents\Codex\2026-10-21\files-pasted-by-the-user-projeto\outputs\highlights-cutter-site"
python -m http.server 8080
```

Depois, acesse `http://localhost:8080`.

## Antes de publicar

Edite `js/config.js` e preencha `contactUrl` com o WhatsApp, e-mail ou página de orçamento autorizada. Exemplo:

```js
contactUrl: "https://wa.me/5511999999999"
```

Não coloque tokens, chaves, senhas ou outras credenciais no arquivo.

## Publicação

Envie o conteúdo inteiro desta pasta a um host estático (Netlify, Vercel, GitHub Pages, Cloudflare Pages ou hospedagem convencional). Não há backend necessário para a página atual. Caso seja desejado um formulário de envio, será preciso configurar um endpoint de e-mail/CRM ou serviço de formulários autorizado; a página não simula esse envio.

## Conteúdo a fornecer depois

- Link comercial (WhatsApp, e-mail ou formulário);
- Logo oficial exportado, se houver;
- Links sociais públicos, se desejar exibi-los;
- Portfólio, imagens e vídeos comprovadamente autorizados para publicação.

As demonstrações gráficas presentes na página são deliberadamente identificadas como ilustrativas. Nenhum vídeo, banco de dados, token ou dado privado do software original foi copiado.
