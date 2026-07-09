async function test() {
  const apiKey = "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";
  const apiUrl = "https://integrate.api.nvidia.com/v1/chat/completions";
  
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "meta/llama-3.1-70b-instruct",
      messages: [{role: "user", content: "Hello"}],
      temperature: 0.2,
      max_tokens: 100,
      stream: true,
    }),
  });
  
  if (!response.ok) {
    console.error("API error", response.status, await response.text());
    return;
  }
  
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let text = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    text += decoder.decode(value);
  }
  console.log("RESPONSE STREAM:", text);
}
test();
