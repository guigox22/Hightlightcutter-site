const apiKey = process.env.YOUTUBE_API_KEY;
if (!apiKey) {
  console.log("YOUTUBE_API_KEY ainda não foi configurada; nenhuma atualização foi publicada.");
  process.exit(0);
}
const endpoints = [
  { slug: "politicando", param: "forHandle", value: "@PoliticandoeCortando" },
  { slug: "geniais", param: "id", value: "UComA8cbNn7BYJAtegJXnypA" },
  { slug: "gta", param: "id", value: "UC0RkzDGCmMc0rTr3DaWT7tQ" }
];
const channels = {};
for (const channel of endpoints) {
  const url = new URL("https://www.googleapis.com/youtube/v3/channels");
  url.searchParams.set("part", "statistics");
  url.searchParams.set(channel.param, channel.value);
  url.searchParams.set("key", apiKey);
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Falha na consulta ao YouTube para ${channel.slug}: HTTP ${response.status}`);
  const payload = await response.json();
  const stats = payload.items?.[0]?.statistics;
  if (!stats) throw new Error(`Estatísticas ausentes para ${channel.slug}`);
  const views = Number(stats.viewCount);
  const videos = Number(stats.videoCount);
  const subscribers = stats.hiddenSubscriberCount ? null : Number(stats.subscriberCount);
  if (!Number.isFinite(views) || !Number.isFinite(videos) || (subscribers !== null && !Number.isFinite(subscribers))) {
    throw new Error(`Estatísticas inválidas para ${channel.slug}`);
  }
  channels[channel.slug] = { subscribers, views, videos };
}
const result = { updatedAt: new Date().toISOString(), channels };
const { writeFile } = await import("node:fs/promises");
await writeFile("channel-stats.json", JSON.stringify(result, null, 2) + "\n");
console.log("Estatísticas públicas de três canais atualizadas.");
