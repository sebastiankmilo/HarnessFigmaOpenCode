---
name: figma-extraction
description: Extraer datos de diseño desde Figma con TalkToFigma (canal, orden de herramientas, trazabilidad). Úsala siempre que se pida leer el diseño: tokens, componentes, pantallas, assets o reacciones del prototipo.
---

# Extracción de diseño desde Figma

## Arranque de la conexión (3 piezas, en orden)

1. WebSocket local: `cd ~/tools/talk-to-figma && bun socket` (puerto 3055, dejar abierto).
2. Figma: abrir la **copia** en Drafts → *Resources (⇧I) → Plugins → Talk to Figma MCP*
   → dejar la ventana abierta → **Connect**.
3. El plugin genera un **canal aleatorio** (no se elige ni se escribe en Figma).
   Copiarlo a `Pagina_web_vanguardia/.env`: `chanel_name = "<copiado>"`.
   **Prohibido hardcodear el canal** en código, docs ni prompts: siempre leerlo de `.env`.
4. `join_channel` con ese canal y confirmar con `get_document_info`.

Si `get_document_info` no responde (timeout): el socket, el MCP o el plugin están mal.
Verificar en este orden: puerto 3055 escuchando → `lsof -nP -iTCP:3055` muestra una
conexión **ESTABLISHED** (si no, el plugin se desconectó: reabrirlo y Connect) →
`chanel_name` de `.env` = el del plugin → releer
[troubleshooting](../../../docs/tickets/1-flujo-desarrollo-con-figma/entregables/flujo-figma-opencode.md).
**No hay plan B: si no responde, se detiene y se avisa. No se improvisan valores.**

## Orden de herramientas

| Paso | Herramienta | Resultado |
| --- | --- | --- |
| Orientarse | `get_document_info` | Página actual + frames con IDs |
| Listar páginas | `scan_nodes_by_types` con `nodeId: "0:0"`, `types: ["PAGE"]` | Las 5 páginas y sus IDs (`get_document_info` solo devuelve la actual) |
| Escanear contenido | `scan_nodes_by_types` con `types: ["FRAME","COMPONENT","COMPONENT_SET","GROUP"]` | IDs, nombres y bounding boxes (sin tocar `set_focus`, que falla entre páginas) |
| Componentes | `get_local_components` | Los 225 componentes locales con ID y nombre; además **carga todas las páginas** |
| Leer estructura | `get_node_info` / `get_nodes_info` | Árbol filtrado: id, nombre, tipo, rellenos en hex, strokes, `cornerRadius`, `absoluteBoundingBox`, `characters`, tipografía (`style`) y hijos |
| Tokens de texto | `get_styles` | Estilos locales: `colors` (vacío en este archivo), `texts` (36), `effects`, `grids` |
| Interacciones | `get_reactions` con el ID de la página | Nodos con reacciones, trigger, acción, destino y `path` |
| Assets | `export_node_as_image` | **Siempre PNG**, ignora `format` (`const format = "PNG"` en el plugin) |

Ahorro de tokens: pedir primero solo IDs (`scan_nodes_by_types`) y luego
`get_node_info` del nodo concreto.

## Medidas que el plugin no expone

`get_node_info` **no incluye** `padding`, `itemSpacing` ni `layoutMode`. Se derivan de
`absoluteBoundingBox`: padding = `hijo.x − padre.x`; gap = `hijo[n+1].x − (hijo[n].x + hijo[n].width)`.

## Solo lectura

**Prohibido** cualquier MCP de escritura (`create_frame`, `set_fill_color`,
`set_text_content`, `delete_node`, `set_padding`, `set_item_spacing`, etc.). El
archivo que se lee es la **copia** propia: el original de Alejandro no se toca nunca.

## Trazabilidad

Toda spec extraída lleva encabezado con `fuente` (página + nodo), `extraido` (fecha),
`file_key_copia` y `herramienta` (herramientas usadas). Lo que no se pudo confirmar se
marca **`PENDIENTE-FIGMA`** — jamás se inventa un valor.

Plantilla y formato de cada spec:
[especificaciones-diseño](../../../docs/tickets/1-flujo-desarrollo-con-figma/entregables/especificaciones-diseño.md).
