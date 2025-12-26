# DJM MAYA - Premium Cyberpunk AI Assistant

A world-class, production-ready PWA with stunning glassmorphic UI, voice integration, and multi-modal AI capabilities.

## Quick Start

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Python 3 or Node.js (for serving locally)

### Option 1: Python HTTP Server (Recommended)
```bash
python3 -m http.server 8000
# Open http://localhost:8000/index.html
```

### Option 2: Node.js
```bash
npx serve .
# Follow the provided URL
```

### Option 3: VS Code Live Server
- Right-click `index.html` → Open with Live Server
- Or press `Alt+L` `Alt+O`

### Test Page
Before opening the main app, visit `test.html` to verify all systems:
```
http://localhost:8000/test.html
```

## Features

### 🎨 Premium UI/UX
- **Glassmorphism Design**: Frosted-glass panels with backdrop blur
- **Electric Cyan Neon**: #00F0FF primary color with soft glows
- **Animated Star Background**: Twinkling space atmosphere
- **Smooth Animations**: 60fps cubic-bezier transitions
- **Responsive Mobile-First**: Optimized for all screen sizes

### 🎤 Voice Assistant (MAYA)
- **Speech Recognition**: Real-time voice input
- **Text-to-Speech**: AI responses spoken aloud
- **Voice Indicator**: Animated wave pulses when listening
- **Mic-to-Send Morph**: Button smoothly changes based on input state

### 💬 Chat Interface
- **Holographic Bubbles**: User (green) and AI (cyan) message styles
- **Auto-scroll**: Stays at latest message
- **Welcome Screen**: Feature showcase on first load
- **Typing Indicators**: Visual feedback for processing

### 📎 File Management
- **Drag & Drop**: Drop files directly into chat
- **Image Preview**: See attachments before sending
- **Multi-format**: Support images, PDFs, videos
- **Modal Interface**: Clean attachment workflow

### 🎯 Project Management
- **Multi-Project Support**: Create and switch between projects
- **Project Dropdown**: Smooth open/close animation
- **Dynamic Creation**: Add projects with random emoji icons
- **Persistent Storage**: Saved in IndexedDB

### 👤 Profile Management
- **Slide-in Panel**: Access from header button
- **User Info**: Name, email, role display
- **Personal Notes**: Textarea for custom notes
- **Backup/Restore**: Export and import conversation history

### 🔒 Security & Storage
- **IndexedDB**: Local encrypted storage
- **No Cloud Required**: All data stays on device
- **Offline Support**: Works without internet
- **Service Worker**: PWA installation ready
- **OAuth Ready**: Google Auth integration (optional)

## File Structure

```
project/
├── index.html           # Main app interface
├── styles.css           # All styling (glassmorphism, animations)
├──
├── JavaScript Modules:
├── app.js              # Bootstrap initialization
├── ui.js               # Interactive UI components
├── config.js           # Configuration values
├── auth.js             # Google OAuth integration
├── db.js               # IndexedDB management
├── ai-engine.js        # AI response handler
├── voice-engine.js     # Speech recognition/synthesis
├── multimodal.js       # Image + text processing
├── rag.js              # Retrieval-augmented generation
├── backup.js           # Export/import functionality
├── security.js         # Input validation
├── sw.js               # Service worker
│
├── manifest.json       # PWA manifest
├── package.json        # Project metadata
├── test.html           # System diagnostic page
├── README.md           # This file
└── .env                # Environment variables
```

## Key Technologies

- **Vanilla JavaScript**: No frameworks needed
- **CSS Grid & Flexbox**: Modern layout system
- **Web APIs**: Speech Recognition, IndexedDB, Service Workers
- **Glassmorphism**: CSS backdrop-filter and blur effects
- **Progressive Enhancement**: Works with and without JS

## Browser Support

| Browser | Support | Features |
|---------|---------|----------|
| Chrome 90+ | ✅ Full | All features |
| Firefox 88+ | ✅ Full | All features |
| Safari 15+ | ✅ Full | All features |
| Edge 90+ | ✅ Full | All features |
| Mobile | ✅ Full | Touch optimized |

## API Integration

The app is ready to integrate with:
- OpenAI GPT API
- Google Gemini API
- Anthropic Claude API
- Xai Grok API
- Local LLM endpoints

Configure API keys in `config.js`:
```javascript
const config = {
  keys: {
    gpt: "YOUR_KEY",
    gemini: "YOUR_KEY",
    claude: "YOUR_KEY",
    grok: "YOUR_KEY"
  }
};
```

## Supabase Integration

Database credentials in `.env`:
```
VITE_SUPABASE_URL=https://...
VITE_SUPABASE_ANON_KEY=...
```

Ready to connect to Supabase for:
- User profiles
- Chat history
- Project management
- File storage

## Development Tips

### Console Debugging
Open Developer Tools (F12) to see:
- Initialization logs
- Voice recognition events
- Database operations
- API calls

### Testing Voice
1. Click the mic button
2. Speak clearly
3. Wait for transcription
4. Response appears in chat

### Testing Storage
1. Send a message
2. Refresh the page
3. Message persists (with DB integration)

### Mobile Testing
- Open `index.html` on phone
- Add to home screen (PWA)
- Works offline after first load

## Performance

- **No Dependencies**: Zero npm packages
- **Lightweight**: <50KB uncompressed
- **Fast Loading**: All resources inline or CDN
- **Smooth Animation**: 60fps with GPU acceleration
- **Offline Ready**: Service worker caching

## Customization

### Change Theme Colors
Edit `:root` variables in `styles.css`:
```css
--cyan-primary: #00F0FF;
--green-accent: #00FF99;
--bg-primary: #000000;
```

### Modify Star Background
In `ui.js` `initStarBackground()`:
```javascript
const starCount = 150; // Change quantity
```

### Update Fonts
In `index.html` `<head>`:
```html
<link href="https://fonts.googleapis.com/css2?family=..." />
```

## Keyboard Shortcuts

- `Enter`: Send message (without Shift)
- `Shift + Enter`: New line in message
- `Esc`: Close modals
- `F12`: Open Developer Tools

## Troubleshooting

### "Website didn't open"
1. Visit `test.html` first
2. Check browser console (F12)
3. Verify all .js files load (Network tab)
4. Try different browser

### Voice input not working
- Chrome/Edge required for Speech Recognition
- Check microphone permissions
- Ensure `initVoiceEngine()` completed

### Styles not loading
- Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
- Clear browser cache
- Check Network tab for CSS errors

### Database errors
- IndexedDB quota exceeded: Clear browser storage
- Corrupted data: Export backup, clear, import

## License

MIT - Free to use and modify

## Author

Danish Jani - DJM Studio

---

**Status**: Production Ready ✅
**Last Updated**: December 2025
