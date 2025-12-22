async function exportBackup() {
    const projects = await getAllItems('projects');
    const chats = await getAllItems('chats');
    const attachments = await getAllItems('attachments');
    const backup = { projects, chats, attachments, date: new Date() };
    const blob = new Blob([JSON.stringify(backup)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `djm_backup_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
}

async function importBackup(file) {
    const reader = new FileReader();
    reader.onload = async () => {
        const data = JSON.parse(reader.result);
        for (const p of data.projects) await addItem('projects', p);
        for (const c of data.chats) await addItem('chats', c);
        for (const a of data.attachments) await addItem('attachments', a);
    };
    reader.readAsText(file);
}