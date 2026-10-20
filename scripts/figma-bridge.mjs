#!/usr/bin/env node
/* Puente de solo lectura al WebSocket TalkToFigma (socket `bun socket`, :3055).
 * Uso: node scripts/figma-bridge.mjs <command> [params-json]
 * El canal se lee de .env (chanel_name). Solo comandos de LECTURA.
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { randomUUID } from "node:crypto";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const env = readFileSync(join(root, ".env"), "utf8");
const channel = env.match(/chanel_name\s*=\s*"([^"]+)"/)?.[1];
if (!channel) {
  console.error("No se encontró chanel_name en .env");
  process.exit(1);
}

const [command, paramsArg] = process.argv.slice(2);
if (!command) {
  console.error("Uso: node scripts/figma-bridge.mjs <command> [params-json]");
  process.exit(1);
}
const params = paramsArg ? JSON.parse(paramsArg) : {};

const id = randomUUID();
const ws = new WebSocket("ws://127.0.0.1:3055");
const timer = setTimeout(() => {
  console.error("TIMEOUT: sin respuesta del plugin (35s). ¿Plugin abierto en Figma?");
  process.exit(2);
}, 35000);

ws.addEventListener("open", () => {
  ws.send(JSON.stringify({ id, type: "join", channel }));
  // Tras un breve delay para estar en el canal, envía el comando
  setTimeout(() => {
    ws.send(
      JSON.stringify({
        id,
        type: "message",
        channel,
        message: { id, command, params: { ...params, commandId: id } },
      })
    );
  }, 400);
});

ws.addEventListener("message", (event) => {
  const data = JSON.parse(event.data);
  if (data.type === "broadcast" && data.message?.id === id) {
    clearTimeout(timer);
    if (data.message.error) {
      console.error("ERROR:", JSON.stringify(data.message.error));
      process.exit(1);
    }
    console.log(JSON.stringify(data.message.result ?? data.message, null, 2));
    process.exit(0);
  }
});

ws.addEventListener("error", (e) => {
  console.error("WebSocket error:", e.message ?? e);
  process.exit(1);
});
