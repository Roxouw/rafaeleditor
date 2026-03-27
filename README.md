# Rafael Editor

Landing page estatica do `Metodo Strong`, curso de edicao de videos do Rafael, criada para vender a oferta com clareza, CTA forte e boa experiencia no mobile.

## Objetivo do projeto

Esta pagina existe para converter visitantes em alunos do curso.

Prioridades:

- clareza da promessa
- CTA visivel acima da dobra
- oferta facil de entender
- leitura rapida no mobile
- manutencao simples sem quebrar HTML, CSS ou JS

## Direcao da marca

- Marca pessoal: `Rafael Editor`
- Produto principal: `Metodo Strong`
- Posicionamento: ensinar edicao com clareza, ritmo e valor percebido
- Publico: iniciantes, criadores de conteudo, freelancers e pessoas que querem aprender do zero

## Preview da landing

- visual escuro com acento em verde
- hero com CTA principal e oferta resumida
- secoes orientadas a conversao
- provas, oferta, FAQ e CTA final
- navegacao mobile refinada

## Stack

- HTML5
- CSS3
- JavaScript vanilla

## Estrutura do projeto

```text
rafaeleditor/
|- index.html
|- README.md
|- AGENTS.md
|- assets/
|  |- css/
|  |  |- styles.css
|  |- js/
|  |  |- main.js
|  |- images/
|  |- icons/
|- .agents/
|  |- skills/
```

## Separacao de responsabilidades

- `index.html`: estrutura, copy, SEO, oferta e seções da landing
- `assets/css/styles.css`: layout, tipografia, responsividade, componentes e animacoes
- `assets/js/main.js`: menu mobile, modal de video/imagem, carrossel, reveal on scroll e eventos de WhatsApp
- `AGENTS.md`: direcao permanente do projeto, foco de conversao e checklist de conclusao

## Como executar

Como o projeto e estatico, voce pode abrir `index.html` diretamente no navegador.

Para desenvolvimento local, prefira usar um servidor simples.

### Opcao 1: VS Code Live Server

```bash
Open with Live Server
```

### Opcao 2: Python

```bash
python -m http.server 5500
```

Depois acesse:

```text
http://127.0.0.1:5500
```

## Fluxo de edicao

1. Consulte `AGENTS.md` antes de mudancas relevantes.
2. Ajuste copy, estrutura e SEO em `index.html`.
3. Ajuste layout e responsividade em `assets/css/styles.css`.
4. Revise com cuidado qualquer alteracao que toque seletores usados por `assets/js/main.js`.
5. Valide CTA, menu, modal, FAQ e leitura em mobile antes de concluir.

## Cuidados importantes

- Nao trate a pagina como portfolio institucional.
- Priorize conversao acima de estetica.
- Preserve classes, IDs e anchors quando possivel.
- O JS depende de elementos como `site-nav`, `menu-toggle`, `nav-overlay`, `video-modal`, `.reel-modal-trigger`, `.reels-carousel`, `.reveal` e `[data-whatsapp-link]`.
- Prefira mudancas pequenas e reversiveis.

## Checklist rapido

- [x] CTA acima da dobra
- [x] oferta clara
- [x] FAQ com objecoes reais
- [x] prova e autoridade
- [x] estrutura orientada a venda
- [x] base estatica e leve
- [ ] validar links finais de contato e matricula
- [ ] publicar em producao

## Proximos passos sugeridos

- substituir placeholders por provas e materiais reais do curso
- revisar se todos os links de matricula e redes estao finais
- gerar preview image mais forte para compartilhamento social
- publicar em Vercel, Netlify ou GitHub Pages

## Deploy

O projeto pode ser publicado em qualquer host estatico:

- Vercel
- Netlify
- GitHub Pages

Como nao depende de backend, o deploy e simples: basta enviar os arquivos do repositorio.
