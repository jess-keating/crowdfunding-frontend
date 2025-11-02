// src/api/put-fundraiser.js
async function putFundraiser(fundraiserId, updatedData) {
const url = `${import.meta.env.VITE_API_URL}/fundraisers/${fundraiserId}/`;
const token = window.localStorage.getItem("token");

if (!token) throw new Error("You must be logged in to update a fundraiser.");

const response = await fetch(url, {
    method: "PUT",
    headers: {
    "Content-Type": "application/json",
    Authorization: token.startsWith("Token") ? token : `Token ${token}`,
    },
    body: JSON.stringify(updatedData),
});

const data = await response.json().catch(() => null);

if (!response.ok) {
    const msg =
    data?.detail || `HTTP ${response.status}: Error updating fundraiser.`;
    throw new Error(msg);
}

return data;
}

export default putFundraiser;
