async function multimodalStub(text, file) {
    if (!file) return await llmStub('gpt', text);
    const reader = new FileReader();
    return new Promise((resolve) => {
        reader.onload = async () => {
            const base64 = reader.result.split(',')[1];
            const res = await llmStub('gemini-vision', { text, image: base64 });
            resolve(res);
        };
        reader.readAsDataURL(file);
    });
}