import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useFundraiser from "../hooks/use-fundraiser";
import PledgeForm from "../components/PledgeForm";
import { useAuth } from "../hooks/use-auth";
import "./FundraiserPage.css";

function FundraiserPage() {
    const { id } = useParams();
    const { fundraiser, isLoading, error } = useFundraiser(id);
    const { auth } = useAuth(); 
    const [pledges, setPledges] = useState([]);

    // When fundraiser loads, store pledges locally
    useEffect(() => {
        if (fundraiser && fundraiser.pledges) {
            setPledges(fundraiser.pledges);
        }
    }, [fundraiser]);

    // Handle new pledge creation without page refresh
    const handlePledgeSuccess = (newPledge) => {
        setPledges((prev) => [newPledge, ...prev]);
    };

    let totalPledged = 0;
    let progressPercent = 0;

    if (fundraiser && pledges.length > 0) {
        totalPledged = pledges.reduce((sum, p) => sum + p.amount, 0);
        progressPercent = Math.min((totalPledged / fundraiser.goal) * 100, 100);
    }

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>{error.message}</p>;

    return (
        <div className="page-wrap">
            <h2>{fundraiser.title}</h2>
            <h3>Created on: {new Date(fundraiser.date_created).toLocaleString()}</h3>
            <p><strong>Status:</strong> {fundraiser.is_open ? "Open" : "Closed"}</p>

            <img
                src={fundraiser.image}
                alt={fundraiser.title}
                className="fundraiser-image"
            />

            <div className="progress-container">
                <div
                    className="progress-bar"
                    style={{ width: `${progressPercent}%` }}
                />
            </div>
            <p>
                <strong>Total pledged:</strong> ${totalPledged.toFixed(2)} of $
                {fundraiser.goal} ({progressPercent.toFixed(1)}%)
            </p>

            <p><strong>Fundraiser Description:</strong> {fundraiser.description}</p>
            <h3>Goal: ${fundraiser.goal}</h3>
            
            {/* Update button for owner only */}
            {auth?.user?.id === fundraiser.owner && (
                <Link to={`/fundraiser/${fundraiser.id}/update`}>
                    <button className="button">Update Fundraiser</button>
                </Link>
            )}

            <hr />

            <h3>Pledges:</h3>
            {pledges.length > 0 ? (
                <ul>
                    {pledges.map((pledge, index) => (
                        <li key={pledge.id ?? `${pledge.supporter}-${pledge.amount}-${index}`}>
                            ${pledge.amount} from User:{" "}
                            {pledge.anonymous ? "Anonymous" : pledge.supporter}
                            {pledge.comment && <span> — "{pledge.comment}"</span>}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No pledges yet. Be the first to support!</p>
            )}

            <hr />

            <PledgeForm fundraiserId={fundraiser.id} onSuccess={handlePledgeSuccess} />
        </div>
    );
}

export default FundraiserPage;
