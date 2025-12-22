const DB_NAME = "DJM_DB";
const DB_VERSION = 1;
let db;

async function initDB() {
    try {
        await openDB();
        console.log("Database initialized.");
    } catch (error) {
        console.error("Database initialization failed:", error);
    }
}

function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);
        request.onupgradeneeded = (e) => {
            db = e.target.result;
            if (!db.objectStoreNames.contains('projects')) db.createObjectStore('projects', { keyPath: 'id', autoIncrement: true });
            if (!db.objectStoreNames.contains('chats')) db.createObjectStore('chats', { keyPath: 'id', autoIncrement: true });
            if (!db.objectStoreNames.contains('attachments')) db.createObjectStore('attachments', { keyPath: 'id', autoIncrement: true });
        };
        request.onsuccess = () => { db = request.result; resolve(db); };
        request.onerror = (e) => reject(e);
    });
}

async function addItem(store, item) {
    const tx = db.transaction(store, 'readwrite');
    tx.objectStore(store).add(item);
    return tx.complete;
}

async function getAllItems(store) {
    return new Promise((resolve) => {
        const tx = db.transaction(store, 'readonly');
        const items = [];
        tx.objectStore(store).openCursor().onsuccess = (e) => {
            const cursor = e.target.result;
            if (cursor) { items.push(cursor.value); cursor.continue(); }
            else resolve(items);
        };
    });
}