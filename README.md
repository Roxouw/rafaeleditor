# Rafael Editor

Landing page/portfolio para o projeto `rafaeleditor`, criada para apresentar servicos de edicao de video com uma interface premium, responsiva e focada em conversao.

## Preview

- proposta visual escura com acento em verde
- hero com composicao editorial e destaque para posicionamento
- navegacao mobile refinada
- estrutura simples, estatica e facil de manter

## Stack

- HTML5
- CSS3
- JavaScript vanilla

## Estrutura do projeto

```text
rafaeleditor/
|- index.html
|- README.md
|- assets/
|  |- css/
|  |  |- styles.css
|  |- js/
|     |- main.js
```

## Separacao de responsabilidades

- `index.html`: estrutura semantica da pagina
- `assets/css/styles.css`: layout, responsividade, tipografia, componentes e animacoes
- `assets/js/main.js`: interacoes da interface, como menu mobile e reveal on scroll

## Como executar

Como o projeto e estatico, voce pode abrir o arquivo `index.html` diretamente no navegador.

Para desenvolvimento local, o ideal e usar um servidor simples.

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

- altere textos, secoes e estrutura em `index.html`
- altere visual, espacamento, breakpoints e componentes em `assets/css/styles.css`
- altere comportamento e interacoes em `assets/js/main.js`

## Melhorias aplicadas

- separacao entre HTML, CSS e JS
- refactor da responsividade com foco mobile-first
- refinamento da hero e da hero-stage
- reducao e reorganizacao da navbar
- melhoria da navegacao mobile
- README atualizado para manutencao mais simples

## Checklist

- [x] separar arquivos da pagina
- [x] melhorar UX/UI geral
- [x] reduzir e ajustar tipografia no desktop
- [x] tornar a pagina mais responsiva
- [x] ajustar navbar mobile
- [x] reorganizar o README
- [ ] adicionar imagens reais ou mockups do portfolio
- [ ] configurar contato real no CTA final
- [ ] publicar em ambiente de producao

## Proximos passos sugeridos

- substituir placeholders por cases reais
- adicionar links reais de contato, Instagram e portfolio
- gerar uma preview image para compartilhamento social
- publicar no Vercel, Netlify ou GitHub Pages

## Deploy

O projeto pode ser publicado facilmente em qualquer host estatico:

- Vercel
- Netlify
- GitHub Pages

Como a pagina nao depende de backend, o deploy e simples: basta enviar os arquivos do repositorio.

## Objetivo do projeto

Criar uma pagina forte para apresentar o trabalho de Rafael como editor de video, com:

- visual premium
- leitura rapida
- boa experiencia no mobile
- estrutura simples para futuras iteracoes
