const key = process.env.YOUTUBE_API_KEY;
if (!key) throw new Error("Configure o segredo YOUTUBE_API_KEY no GitHub.");
const channels = [
  { id: "UComA8cbNn7BYJAtegJXnypA", slug: "geniais" },
  { id: "UC0RkzDGCmMc0rTr3DaWT7tQ", slug: "gta" }
];
const endpoint = new URL("https://www.googleapis.com/youtube/v3/channels");
endpoint.searchParams.set("part", "id,statistics");
endpoint.searchParams.set("id", channels.map(c => c.id).join(","));
endpoint.searchParams.set("key", key);
const response = await fetch(endpoint);
if (!response.ok) throw new Error(`YouTube API: HTTP ${response.status}`);
const body = await response.json();
if (body.error) throw new Error("YouTube API recusou a consulta.");
const byId = Object.fromEntries((body.items || []).map(item => [item.id, item.statistics]));
const result = { updatedAt: new Date().toISOString(), channels: {} };
for (const channel of channels) {
  const stats = byId[channel.id];
  if (!stats) throw new Error(`Canal não retornado: ${channel.slug}`);
  result.channels[channel.slug] = {
    subscribers: stats.hiddenSubscriberCount ? null : Number(stats.subscriberCount),
    views: Number(stats.viewCount),
    videos: Number(stats.videoCount)
  };
}
const handle = new URL("https://www.googleapis.com/youtube/v3/channels");
handle.searchParams.set("part", "id,statistics");
handle.searchParams.set("forHandle", "@PoliticandoeCortando");
handle.searchParams.set("key", key);
const handleResponse = await fetch(handle);
if (!handleResponse.ok) throw new Error(`YouTube API (handle): HTTP ${handleResponse.status}`);
const handleBody = await handleResponse.json();
const politica = handleBody.items?.[0]?.statistics;
if (!politica) throw new Error("Canal Politicando não retornado.");
result.channels.politicando = {
  subscribers: politica.hiddenSubscriberCount ? null : Number(politica.subscriberCount),
  views: Number(politica.viewCount),
  videos: Number(politica.videoCount)
};
const { writeFile } = await import("node:fs/promises");
await writeFile("channel-stats.json", JSON.stringify(result, null, 2) + "\n");
