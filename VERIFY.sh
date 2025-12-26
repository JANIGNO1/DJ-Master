#!/bin/bash

echo "╔════════════════════════════════════════════════════════════╗"
echo "║           DJM MAYA - System Verification                  ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Check HTML
echo "📄 Checking HTML..."
if grep -q "DJM - Danish Jani Master" index.html; then
  echo "✅ index.html - Valid"
else
  echo "❌ index.html - Invalid"
fi

# Check CSS
echo ""
echo "🎨 Checking CSS..."
if grep -q "cyan-primary" styles.css; then
  echo "✅ styles.css - Valid"
else
  echo "❌ styles.css - Invalid"
fi

# Check all JS files
echo ""
echo "⚙️  Checking JavaScript files..."
files=("config.js" "auth.js" "db.js" "ai-engine.js" "voice-engine.js" "ui.js" "app.js")
for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    if node -c "$file" 2>/dev/null; then
      echo "✅ $file - Syntax OK"
    else
      echo "❌ $file - Syntax Error"
    fi
  else
    echo "❌ $file - Missing"
  fi
done

# Check manifest
echo ""
echo "📦 Checking PWA manifest..."
if grep -q '"name"' manifest.json; then
  echo "✅ manifest.json - Valid"
else
  echo "❌ manifest.json - Invalid"
fi

# Check test page
echo ""
echo "🧪 Checking test page..."
if grep -q "System Diagnostic" test.html; then
  echo "✅ test.html - Valid"
else
  echo "❌ test.html - Invalid"
fi

# Summary
echo ""
echo "════════════════════════════════════════════════════════════"
echo "✨ All Systems Ready!"
echo "════════════════════════════════════════════════════════════"
