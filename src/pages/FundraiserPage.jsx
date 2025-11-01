// src/pages/FundraiserPage.jsx
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useFundraiser from "../hooks/use-fundraiser";
import useUpdateFundraiser from "../hooks/use-update-fundraiser";
import { useAuth } from "../hooks/use-auth";
import PledgeForm from "../components/PledgeForm";
import "./FundraiserPage.css";

function FundraiserPage() {
    const { id } = useParams();
    const { fundraiser, isLoading, error, refetch } = useFundraiser(id);
    const { auth } = useAuth();
    const { updateFundraiser, isLoading: updating } = useUpdateFundraiser();
    const [pledges, setPledges] = useState([]);

    useEffect(() => {
        if (fundraiser?.pledges) setPledges(fundraiser.pledges);
    }, [fundraiser]);

    const handlePledgeSuccess = (newPledge) => {
        setPledges((prev) => [newPledge, ...prev]);
    };

    const totalPledged = pledges.reduce((sum, p) => sum + p.amount, 0);
    const progressPercent = Math.min(
        (totalPledged / (fundraiser?.goal || 1)) * 100,
        100
    );

    const isOwnerOrAdmin =
        auth?.user?.id === fundraiser?.owner || auth?.user?.is_superuser;

    // ✅ Close fundraiser
    const handleCloseFundraiser = async () => {
        if (!window.confirm("Are you sure you want to close this fundraiser?")) return;
        try {
            await updateFundraiser(fundraiser.id, { is_open: false });
            alert("Fundraiser closed successfully!");
            await refetch(); // ✅ refresh data
        } catch {
            alert("Failed to close fundraiser.");
        }
    };

    // ✅ Reopen fundraiser
    const handleReopenFundraiser = async () => {
        if (!window.confirm("Reopen this fundraiser to accept new pledges?")) return;
        try {
            await updateFundraiser(fundraiser.id, { is_open: true });
            alert("Fundraiser reopened successfully!");
            await refetch(); // ✅ refresh data
        } catch {
            alert("Failed to reopen fundraiser.");
        }
    };

    if (isLoading) return <p>Loading...</p>;
    if (error)
        return (
            <div className="page-wrap">
                <p>Error: {error.message}</p>
            </div>
        );

    return (
        <div className="page-wrap">
            <h2>{fundraiser.title}</h2>
            <h3>Created on: {new Date(fundraiser.date_created).toLocaleString()}</h3>
            <p>
                <strong>Status:</strong>{" "}
                {fundraiser.is_open ? "🟢 Open" : "🔴 Closed"}
            </p>

            <img src={fundraiser.image} alt={fundraiser.title} className="fundraiser-image" />

            {/* Progress bar */}
            <div className="progress-container">
                <div className="progress-bar" style={{ width: `${progressPercent}%` }} />
            </div>

            <p>
                <strong>Total pledged:</strong> ${totalPledged.toFixed(2)} of $
                {fundraiser.goal} ({progressPercent.toFixed(1)}%)
            </p>

            <p>
                <strong>Description:</strong> {fundraiser.description}
            </p>

            <hr />

            {isOwnerOrAdmin && (
                <div className="fundraiser-controls">
                    {fundraiser.is_open ? (
                        <button onClick={handleCloseFundraiser} disabled={updating}>
                            {updating ? "Closing..." : "Close Fundraiser"}
                        </button>
                    ) : (
                        <button onClick={handleReopenFundraiser} disabled={updating}>
                            {updating ? "Reopening..." : "Reopen Fundraiser"}
                        </button>
                    )}
                    <Link to={`/fundraiser/${fundraiser.id}/update`}>
                        <button>Update Fundraiser</button>
                    </Link>
                </div>
            )}

            <hr />

            <h3>Pledges:</h3>
            {pledges.length > 0 ? (
                <ul>
                    {pledges.map((pledge) => (
                        <li key={pledge.id}>
                            ${pledge.amount} from{" "}
                            {pledge.anonymous ? "Anonymous" : pledge.supporter}
                            {pledge.comment && <span> — “{pledge.comment}”</span>}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No pledges yet. Be the first to support!</p>
            )}

            {fundraiser.is_open && (
                <>
                    <hr />
                    <PledgeForm fundraiserId={fundraiser.id} onSuccess={handlePledgeSuccess} />
                </>
            )}
        </div>
    );
}

export default FundraiserPage;
