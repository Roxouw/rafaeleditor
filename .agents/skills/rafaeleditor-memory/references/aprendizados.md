# Aprendizados

## Como manter este arquivo

Registre apenas aprendizados duradouros e reutilizaveis. Evite transformar este arquivo em changelog.

Modelo curto:

- Data:
- Contexto:
- Erro ou risco:
- Impacto:
- Prevencao segura:

## Aprendizados validados

### 2026-03-27 - README pode divergir do objetivo atual

- Contexto: o README ainda descreve partes do projeto como landing page/portfolio de servicos, enquanto `AGENTS.md` define a pagina como landing de venda de curso.
- Erro ou risco: confiar no README como unica fonte pode levar a copy, secoes e decisoes desalinhadas com a conversao do curso.
- Impacto: risco de voltar para um posicionamento institucional ou de portfolio.
- Prevencao segura: quando houver conflito, priorizar `AGENTS.md` e a estrutura real do `index.html`.

### 2026-03-27 - JS depende de IDs e classes especificas

- Contexto: `assets/js/main.js` controla menu mobile, modal de video/imagem, reveal on scroll, carrossel de reels e rastreio de WhatsApp.
- Erro ou risco: remover ou renomear IDs, classes ou atributos usados nos seletores pode quebrar comportamento sem erro visual imediato.
- Impacto: menu, modal, analytics, reveal e autoplay podem parar de funcionar.
- Prevencao segura: antes de mexer em markup, revisar os seletores de `assets/js/main.js`, especialmente `site-nav`, `menu-toggle`, `nav-overlay`, `video-modal`, `video-modal-frame`, `video-modal-title`, `.reel-modal-trigger`, `.reels-carousel`, `.reels-track`, `.reveal` e `[data-whatsapp-link]`.

### 2026-03-27 - Mudancas de conversao devem respeitar a base visual atual

- Contexto: a landing ja tem linguagem visual escura com acento verde e estrutura de venda em andamento.
- Erro ou risco: refatoracoes grandes por estetica podem consumir tempo, aumentar risco de regressao e piorar clareza.
- Impacto: perda de consistencia, quebra de responsividade e retrabalho.
- Prevencao segura: priorizar ajustes incrementais em headline, CTA, prova, oferta, FAQ e hierarquia antes de redesenhar blocos inteiros.

### 2026-03-27 - Melhorias seguras devem ser aplicadas sem esperar nova confirmacao

- Contexto: o usuario quer que melhorias claras e correcoes de baixo risco sejam executadas automaticamente durante a adaptacao da landing.
- Erro ou risco: parar para pedir permissao em cada melhoria pequena reduz ritmo e atrasa a evolucao da pagina.
- Impacto: menos fluidez no trabalho e mais microdecisoes desnecessarias.
- Prevencao segura: ao encontrar melhorias objetivas em copy, hierarquia visual, responsividade ou limpeza tecnica, implementar direto e apenas relatar no fechamento. Perguntar so quando houver impacto estrategico, risco alto ou trade-off pouco obvio.
