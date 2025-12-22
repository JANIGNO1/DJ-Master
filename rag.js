async function ragStub(query) {
    const chats = await getAllItems('chats');
    return chats.filter(c => c.message.includes(query)).map(c => c.message).join(' ');
}

async function contextStub(prompt) {
    const context = await ragStub(prompt);
    return prompt + ' [Context: ' + context + ']';
}