import FundraiserForm from "../components/FundraiserForm";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function CreateFundraiserPage() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");

    const handleSuccess = () => {
        // Redirect to homepage after creation
        navigate("/");
    };

    const handleError = (message) => {
        setErrorMessage(message);
    };

    return (
        <div className="page-wrap">
            <h1>Start a New Fundraiser</h1>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

            <FundraiserForm onSuccess={handleSuccess} onError={handleError} />
        </div>
    );
}

export default CreateFundraiserPage;
