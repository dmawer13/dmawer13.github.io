// This function makes an API request to the OpenAI GPT-3 endpoint
async function generateText(prompt) {
  const apiKey = "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";
  const response = await fetch(
    `https://api.openai.com/v1/engines/davinci/completions`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        prompt: prompt,
        max_tokens: 100,
        n: 1,
        stop: "",
        temperature: 0.5
      })
    }
  );
  const json = await response.json();
  return json.choices[0].text;
}

// This function is called when the user clicks the "Generate" button
async function onGenerateClick() {
  const prompt = document.getElementById("prompt").value;
  const response = await generateText(prompt);
  document.getElementById("response").innerText = response;
}

// Add the "Generate" button to the page
document.body.innerHTML = `
  <textarea id="prompt"></textarea>
  <button id="generate-button">Generate</button>
  <div id="response"></div>
`;

// Attach the onGenerateClick function to the "Generate" button
document.getElementById("generate-button").addEventListener("click", onGenerateClick);