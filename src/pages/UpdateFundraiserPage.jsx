// src/pages/UpdateFundraiserPage.jsx
import { useParams, useNavigate } from "react-router-dom";
import useFundraiser from "../hooks/use-fundraiser";
import UpdateFundraiserForm from "../components/UpdateFundraiserForm";

function UpdateFundraiserPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { fundraiser, isLoading, error } = useFundraiser(id);

    if (isLoading) return <p>Loading fundraiser...</p>;
    if (error) return <p>{error.message}</p>;

    return (
        <div className="page-wrap">
            <UpdateFundraiserForm
                fundraiser={fundraiser}
                onSuccess={() => navigate(`/fundraiser/${id}`)}
            />
        </div>
    );
}

export default UpdateFundraiserPage;
