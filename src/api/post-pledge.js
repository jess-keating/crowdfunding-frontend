const API_URL =
import.meta.env.VITE_API_URL || "https://lightup-38603a824c6f.herokuapp.com";

async function postPledge(pledgeData) {
const token = window.localStorage.getItem("token");

if (!token) {
    throw new Error("You must be logged in to make a pledge.");
}

const payload = {
    amount: parseFloat(pledgeData.amount),
    comment: pledgeData.comment || "",
    anonymous: pledgeData.anonymous ?? false,
    fundraiser: pledgeData.fundraiser, // ID of fundraiser
};

const response = await fetch(`${API_URL}/pledges/`, {
    method: "POST",
    headers: {
    "Content-Type": "application/json",
    Authorization: token.startsWith("Token") ? token : `Token ${token}`,
    },
    body: JSON.stringify(payload),
});

let data;
try {
    data = await response.json();
} catch {
    throw new Error("Invalid server response when creating pledge.");
}

if (!response.ok) {
    const message =
    data?.detail ||
    Object.entries(data || {})
        .map(([k, v]) => `${k}: ${v}`)
        .join(", ") ||
    `HTTP ${response.status}: Error creating pledge`;
    throw new Error(message);
}

return data;
}

export default postPledge;
