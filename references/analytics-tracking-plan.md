# Plano de Tracking da Landing

## Visão geral

- Ferramenta atual: `GA4` via `gtag.js`
- Conversão principal: intenção de inscrição via WhatsApp
- Objetivo da medição: entender quais seções e CTAs mais contribuem para a intenção de compra

## Eventos implementados

| Event Name | Descrição | Propriedades principais | Trigger |
|------------|-----------|-------------------------|---------|
| `cta_clicked` | Clique em CTA da landing | `button_text`, `location`, `cta_type`, `destination`, `destination_type` | Clique em botões e links de ação |
| `signup_intent` | Intenção de inscrição | `method`, `location`, `button_text` | Clique em links de WhatsApp |
| `click_whatsapp` | Compatibilidade com tracking legado | `event_label`, `destination` | Clique em links de WhatsApp |
| `module_preview_opened` | Interesse em preview de módulo | `video_id`, `video_title`, `location` | Abertura de preview em modal |
| `proof_link_clicked` | Clique em prova/autoridade externa | `profile_name`, `location`, `destination_type` | Clique nos links dos perfis da seção de provas |
| `faq_opened` | Interesse em objeções específicas | `question`, `location` | Abertura de item do FAQ |
| `section_viewed` | Profundidade de leitura por seção | `section_name` | Quando a seção entra em viewport |
| `nav_menu_toggled` | Uso do menu mobile | `state`, `location` | Abrir ou fechar menu mobile |

## Parâmetros de campanha enviados nos eventos

- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_content`
- `utm_term`

Quando ausentes, os eventos enviam valores fallback para facilitar análise de tráfego direto.

## Conversões recomendadas no GA4

Marcar como conversão:

1. `signup_intent`

Monitorar como evento de apoio:

1. `cta_clicked`
2. `module_preview_opened`
3. `proof_link_clicked`
4. `faq_opened`
5. `section_viewed`

## Perguntas que este tracking ajuda a responder

1. Qual CTA gera mais intenção de inscrição?
2. Quais seções as pessoas realmente consomem antes de clicar?
3. Os previews dos módulos aumentam interesse?
4. Quais objeções aparecem mais no FAQ?
5. A seção de provas está sendo usada como apoio de decisão?

## Validação recomendada

1. Abrir a landing com `?utm_source=teste&utm_medium=debug&utm_campaign=landing&debug_analytics=1`
2. Verificar eventos no `GA4 DebugView`
3. Confirmar que `signup_intent` dispara ao clicar no WhatsApp
4. Confirmar que `cta_clicked` não duplica em cliques de WhatsApp além do esperado
5. Confirmar que `section_viewed` dispara uma vez por seção

## Debug mode implementado

O código envia `debug_mode: true` quando qualquer uma destas condições é atendida:

- URL com `debug_analytics=1`
- URL com `gtm_debug=x`
- ambiente `localhost`
- execução via `file://`

Isso facilita validar os eventos no `GA4 DebugView` sem precisar alterar o código a cada teste.

## Próximo passo recomendado

Se você for rodar testes de headline, oferta ou CTA, o ideal é adicionar também uma propriedade como `page_variant` nos eventos para segmentar resultados por versão.
