---
name: rafaeleditor-memory
description: Use esta skill ao trabalhar no repositorio rafaeleditor para carregar memoria do projeto, contexto estavel da landing, riscos tecnicos recorrentes e aprendizados validados a partir de erros ou iteracoes anteriores.
---

# Quando usar

Use esta skill quando a tarefa envolver este repositorio e voce precisar:

- entender rapidamente o objetivo comercial da landing
- retomar contexto sem reler o projeto inteiro
- evitar regressao em HTML, CSS ou JavaScript
- registrar aprendizados duradouros apos bugs, erros ou revisoes

# Objetivo

Dar contexto curto e confiavel sobre o projeto antes de editar a landing e manter uma memoria util, enxuta e cumulativa.

# Leitura recomendada

1. Leia `AGENTS.md` para alinhar objetivo, copy e limites tecnicos.
2. Leia `references/contexto-do-projeto.md` para entender a estrutura atual e o que esta estavel.
3. Leia `references/aprendizados.md` quando a tarefa mexer em layout, copy, responsividade ou scripts.

# Como usar esta memoria

- Trate `AGENTS.md` como fonte principal de direcao do projeto.
- Use a memoria apenas para contexto recorrente e riscos que valem ser lembrados.
- Nao registre observacoes temporarias, preferencias soltas ou mudancas triviais.
- Quando encontrar melhorias claras, seguras e de baixo risco para conversao, copy, hierarquia visual, responsividade ou limpeza tecnica, implemente automaticamente sem pedir confirmacao antes.
- So pause para perguntar quando a mudanca tiver consequencia pouco obvia, alto risco de regressao ou alterar posicionamento, oferta ou comportamento central da pagina.

# Quando atualizar

Atualize `references/aprendizados.md` somente se surgir um aprendizado que provavelmente ajudara em tarefas futuras, como:

- um erro recorrente
- uma dependencia entre HTML, CSS e JS facil de quebrar
- uma divergencia de documentacao que possa confundir
- uma decisao de implementacao que deve ser preservada

# Como registrar um novo aprendizado

Adicione entradas curtas com:

- data
- contexto
- erro ou risco
- impacto observado
- forma segura de evitar ou corrigir

Priorize notas curtas e acionaveis.
