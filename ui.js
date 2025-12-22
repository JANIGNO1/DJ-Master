let isVoiceActive = false;
let currentAttachment = null;

function initUI() {
    console.log("Initializing UI...");

    initStarBackground();

    initEventListeners();

    adjustInputHeight();
}

function initStarBackground() {
    const starBg = document.getElementById('starBackground');
    if (!starBg) return;

    const starCount = 150;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';

        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const size = Math.random() * 2 + 1;
        const duration = Math.random() * 3 + 3;
        const delay = Math.random() * 4;

        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.animationDuration = `${duration}s`;
        star.style.animationDelay = `${delay}s`;

        if (Math.random() > 0.5) {
            star.style.animation += `, starDrift ${Math.random() * 30 + 20}s linear infinite`;
        }

        starBg.appendChild(star);
    }
}

function initEventListeners() {
    const userInput = document.getElementById('userInput');
    const primaryActionBtn = document.getElementById('primaryActionBtn');
    const profileBtn = document.getElementById('profileBtn');
    const closeProfileBtn = document.getElementById('closeProfileBtn');
    const profileOverlay = document.getElementById('profileOverlay');
    const projectSelectorBtn = document.getElementById('projectSelectorBtn');
    const projectDropdown = document.getElementById('projectDropdown');
    const attachBtn = document.getElementById('attachBtn');
    const cameraBtn = document.getElementById('cameraBtn');
    const attachmentModal = document.getElementById('attachmentModal');
    const modalOverlay = document.getElementById('modalOverlay');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const cancelAttachBtn = document.getElementById('cancelAttachBtn');
    const confirmAttachBtn = document.getElementById('confirmAttachBtn');
    const fileDropZone = document.getElementById('fileDropZone');
    const attachmentInput = document.getElementById('attachmentInput');
    const exportBackupBtn = document.getElementById('exportBackupBtn');
    const importBackupBtn = document.getElementById('importBackupBtn');
    const newProjectBtn = document.getElementById('newProjectBtn');

    if (userInput) {
        userInput.addEventListener('input', handleInputChange);
        userInput.addEventListener('keydown', handleInputKeydown);
    }

    if (primaryActionBtn) {
        primaryActionBtn.addEventListener('click', handlePrimaryAction);
    }

    if (profileBtn) {
        profileBtn.addEventListener('click', () => toggleProfile(true));
    }

    if (closeProfileBtn) {
        closeProfileBtn.addEventListener('click', () => toggleProfile(false));
    }

    if (profileOverlay) {
        profileOverlay.addEventListener('click', () => toggleProfile(false));
    }

    if (projectSelectorBtn) {
        projectSelectorBtn.addEventListener('click', toggleProjectDropdown);
    }

    document.addEventListener('click', (e) => {
        if (projectDropdown && !projectDropdown.contains(e.target) && e.target !== projectSelectorBtn) {
            projectDropdown.classList.remove('active');
        }
    });

    if (attachBtn) {
        attachBtn.addEventListener('click', () => toggleAttachmentModal(true));
    }

    if (cameraBtn) {
        cameraBtn.addEventListener('click', () => toggleAttachmentModal(true));
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => toggleAttachmentModal(false));
    }

    if (cancelAttachBtn) {
        cancelAttachBtn.addEventListener('click', () => toggleAttachmentModal(false));
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', () => toggleAttachmentModal(false));
    }

    if (confirmAttachBtn) {
        confirmAttachBtn.addEventListener('click', handleConfirmAttachment);
    }

    if (fileDropZone) {
        fileDropZone.addEventListener('click', () => attachmentInput?.click());

        fileDropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            fileDropZone.style.borderColor = 'var(--cyan-primary)';
        });

        fileDropZone.addEventListener('dragleave', () => {
            fileDropZone.style.borderColor = 'var(--glass-border)';
        });

        fileDropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            fileDropZone.style.borderColor = 'var(--glass-border)';
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                handleFileSelect(files[0]);
            }
        });
    }

    if (attachmentInput) {
        attachmentInput.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                handleFileSelect(e.target.files[0]);
            }
        });
    }

    if (exportBackupBtn) {
        exportBackupBtn.addEventListener('click', () => {
            if (typeof exportBackup === 'function') {
                exportBackup();
            }
        });
    }

    if (importBackupBtn) {
        importBackupBtn.addEventListener('click', () => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'application/json';
            input.onchange = (e) => {
                if (e.target.files.length > 0 && typeof importBackup === 'function') {
                    importBackup(e.target.files[0]);
                }
            };
            input.click();
        });
    }

    if (newProjectBtn) {
        newProjectBtn.addEventListener('click', handleNewProject);
    }
}

function handleInputChange() {
    const userInput = document.getElementById('userInput');
    const primaryActionBtn = document.getElementById('primaryActionBtn');

    if (!userInput || !primaryActionBtn) return;

    adjustInputHeight();

    if (userInput.value.trim().length > 0) {
        primaryActionBtn.classList.add('send-mode');
    } else {
        primaryActionBtn.classList.remove('send-mode');
    }
}

function adjustInputHeight() {
    const userInput = document.getElementById('userInput');
    if (!userInput) return;

    userInput.style.height = 'auto';
    userInput.style.height = Math.min(userInput.scrollHeight, 120) + 'px';
}

function handleInputKeydown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
}

function handlePrimaryAction() {
    const userInput = document.getElementById('userInput');
    const primaryActionBtn = document.getElementById('primaryActionBtn');

    if (!userInput || !primaryActionBtn) return;

    if (primaryActionBtn.classList.contains('send-mode')) {
        sendMessage();
    } else {
        toggleVoiceRecording();
    }
}

function sendMessage() {
    const userInput = document.getElementById('userInput');
    if (!userInput) return;

    const message = userInput.value.trim();
    if (!message && !currentAttachment) return;

    const welcomeScreen = document.querySelector('.welcome-screen');
    if (welcomeScreen) {
        welcomeScreen.style.display = 'none';
    }

    if (message) {
        addMessageToChat(message, 'user');
    }

    userInput.value = '';
    adjustInputHeight();

    const primaryActionBtn = document.getElementById('primaryActionBtn');
    if (primaryActionBtn) {
        primaryActionBtn.classList.remove('send-mode');
    }

    currentAttachment = null;

    setTimeout(() => {
        processUserMessage(message);
    }, 300);
}

function addMessageToChat(message, sender) {
    const chatContainer = document.getElementById('chatContainer');
    if (!chatContainer) return;

    const messageBubble = document.createElement('div');
    messageBubble.className = `message-bubble ${sender}`;

    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    messageContent.textContent = message;

    messageBubble.appendChild(messageContent);
    chatContainer.appendChild(messageBubble);

    const chatWindow = document.getElementById('chatWindow');
    if (chatWindow) {
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }
}

async function processUserMessage(message) {
    showLoading(true);

    try {
        let response = "I'm processing your request...";

        if (typeof llmStub === 'function') {
            response = await llmStub('gpt', message);
            if (typeof response === 'object') {
                response = response.choices?.[0]?.message?.content || JSON.stringify(response);
            }
        } else if (typeof localFallback === 'function') {
            response = await localFallback(message);
        }

        addMessageToChat(response, 'ai');
    } catch (error) {
        console.error('Error processing message:', error);
        addMessageToChat('Sorry, I encountered an error processing your message.', 'ai');
    } finally {
        showLoading(false);
    }
}

function toggleVoiceRecording() {
    const voiceIndicator = document.getElementById('voiceIndicator');

    isVoiceActive = !isVoiceActive;

    if (voiceIndicator) {
        if (isVoiceActive) {
            voiceIndicator.classList.add('active');
            if (typeof startRecognition === 'function') {
                startRecognition();
            }
        } else {
            voiceIndicator.classList.remove('active');
            if (typeof recognition !== 'undefined' && recognition) {
                recognition.stop();
            }
        }
    }
}

function toggleProfile(show) {
    const profilePanel = document.getElementById('profilePanel');
    if (!profilePanel) return;

    if (show) {
        profilePanel.classList.add('active');
        document.body.style.overflow = 'hidden';
    } else {
        profilePanel.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function toggleProjectDropdown() {
    const projectDropdown = document.getElementById('projectDropdown');
    if (!projectDropdown) return;

    projectDropdown.classList.toggle('active');
}

function toggleAttachmentModal(show) {
    const attachmentModal = document.getElementById('attachmentModal');
    if (!attachmentModal) return;

    if (show) {
        attachmentModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    } else {
        attachmentModal.classList.remove('active');
        document.body.style.overflow = '';

        const filePreview = document.getElementById('filePreview');
        if (filePreview) {
            filePreview.innerHTML = '';
        }
        currentAttachment = null;
    }
}

function handleFileSelect(file) {
    if (!file) return;

    currentAttachment = file;

    const filePreview = document.getElementById('filePreview');
    if (!filePreview) return;

    filePreview.innerHTML = '';

    if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = document.createElement('img');
            img.src = e.target.result;
            filePreview.appendChild(img);
        };
        reader.readAsDataURL(file);
    } else {
        const fileInfo = document.createElement('p');
        fileInfo.textContent = `${file.name} (${(file.size / 1024).toFixed(2)} KB)`;
        fileInfo.style.color = 'var(--cyan-primary)';
        fileInfo.style.textAlign = 'center';
        fileInfo.style.padding = 'var(--spacing-unit)';
        filePreview.appendChild(fileInfo);
    }
}

function handleConfirmAttachment() {
    if (currentAttachment) {
        addMessageToChat(`Attached: ${currentAttachment.name}`, 'user');
    }
    toggleAttachmentModal(false);
}

function handleNewProject() {
    const projectName = prompt('Enter project name:');
    if (!projectName) return;

    const projectList = document.getElementById('projectList');
    if (!projectList) return;

    const icons = ['🎯', '🚀', '💼', '🎨', '📱', '💡', '🔥', '⚡'];
    const randomIcon = icons[Math.floor(Math.random() * icons.length)];

    const projectItem = document.createElement('div');
    projectItem.className = 'project-item';
    projectItem.innerHTML = `
        <div class="project-icon">${randomIcon}</div>
        <div class="project-info">
            <div class="project-name">${projectName}</div>
            <div class="project-meta">New</div>
        </div>
    `;

    projectItem.addEventListener('click', () => {
        document.querySelectorAll('.project-item').forEach(item => {
            item.classList.remove('active');
        });
        projectItem.classList.add('active');

        const meta = projectItem.querySelector('.project-meta');
        if (meta) meta.textContent = 'Active';
    });

    projectList.appendChild(projectItem);
}

function showLoading(show) {
    const loadingIndicator = document.getElementById('loadingIndicator');
    if (!loadingIndicator) return;

    if (show) {
        loadingIndicator.classList.add('active');
    } else {
        loadingIndicator.classList.remove('active');
    }
}

if (typeof window !== 'undefined') {
    window.initUI = initUI;
    window.addMessageToChat = addMessageToChat;
    window.processUserMessage = processUserMessage;
}
