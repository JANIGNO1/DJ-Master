// auth.js

// Google OAuth client ID (replace with your own)
const CLIENT_ID = "111688780236-7j8oiuc3qq5oj8lj3917jtjc97ihtg45.apps.googleusercontent.com";
const OWNER_EMAIL = "danishjani@gmail.com";

let currentUser = null;

/**
 * Initialize Google OAuth and verify owner email
 */
async function initAuth() {
  return new Promise((resolve, reject) => {
    // Load Google Identity Services script dynamically
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => {
      console.log("Google Identity Services loaded.");

      // Initialize Google Sign-In
      google.accounts.id.initialize({
        client_id: CLIENT_ID,
        callback: handleCredentialResponse,
        auto_select: true
      });

      // Render a hidden button for auto login (optional)
      google.accounts.id.prompt(); // prompt login if not already

      resolve();
    };

    script.onerror = () => reject("Failed to load Google Identity Services.");
    document.head.appendChild(script);
  });
}

/**
 * Handle OAuth credential response
 */
function handleCredentialResponse(response) {
  try {
    const jwt = parseJwt(response.credential);
    currentUser = jwt.email;

    if (currentUser !== OWNER_EMAIL) {
      alert("Access Denied. Only owner can use DJM.");
      throw new Error("Unauthorized user: " + currentUser);
    } else {
      console.log("Owner verified:", currentUser);
      // You can trigger next boot step here if needed
    }
  } catch (e) {
    console.error("OAuth verification failed:", e);
  }
}

/**
 * Parse JWT to get payload
 */
function parseJwt(token) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(c => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
      .join("")
  );
  return JSON.parse(jsonPayload);
}