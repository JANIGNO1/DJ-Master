async function localFallback(prompt) {
    // Simple pattern matching for offline
    if (/hello|hi/i.test(prompt)) return "Hello! I am MAYA, your AI assistant.";
    if (/project/i.test(prompt)) return "You can create or select a project.";
    return "Offline response: Unable to process complex queries.";
}

async function llmStub(model, prompt) {
    if (!navigator.onLine) return localFallback(prompt);
    try {
        const res = await fetch(`https://api.example.com/${model}`, {
            method: 'POST',
            headers: { 'Authorization': 'Bearer ' + config.keys[model] },
            body: JSON.stringify({ prompt })
        });
        return await res.json();
    } catch (e) {
        console.error(e);
        return localFallback(prompt);
    }
}

async function reasoningStub(prompt) {
    const step1 = await llmStub('claude', `Analyze: ${prompt}`);
    const step2 = await llmStub('gpt', `Plan: ${step1}`);
    return step2;
}

async function predictStub(history) {
    return llmStub('gemini', 'Predict next: ' + history.join(' '));
}

async function designStub(desc) {
    return llmStub('grok', 'Generate HTML/CSS/JS code: ' + desc);
}