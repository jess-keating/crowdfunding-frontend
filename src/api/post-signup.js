// src/api/post-signup.js
async function postSignup(userData) {
const url = `${import.meta.env.VITE_API_URL}/users/`;

console.log("Sending signup request to:", url);
console.log("With data:", userData);

const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
});

const responseText = await response.text();

let data;
try {
    data = JSON.parse(responseText);
} catch {
    data = { detail: responseText };
}

if (!response.ok) {
    const fallbackError = `HTTP ${response.status}: Error creating new account`;
    const error = new Error(data?.detail || fallbackError);
    error.response = {
    status: response.status,
    statusText: response.statusText,
    data: data,
    };
    error.serverData = data;
    throw error;
}

return data;
}

export default postSignup;
