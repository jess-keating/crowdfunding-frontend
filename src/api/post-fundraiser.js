const postFundraiser = async (formData, token) => {
const response = await fetch(`${import.meta.env.VITE_API_URL}/fundraisers/`, {
    method: "POST",
    headers: {
    "Content-Type": "application/json",
    Authorization: `Token ${token}`,
    },
    body: JSON.stringify(formData),
});

if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Failed to create fundraiser.");
}

return response.json();
};

export default postFundraiser;
