import { useParams } from "react-router-dom";
import useFundraiser from "../hooks/use-fundraiser";
import PledgeForm from "../components/PledgeForm"; // ✅ import the new component

function FundraiserPage() {
    const { id } = useParams();
    const { fundraiser, isLoading, error } = useFundraiser(id);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>{error.message}</p>;

    return (
        <div className="page-wrap">
            <h2>{fundraiser.title}</h2>
            <h3>Created at: {new Date(fundraiser.date_created).toLocaleString()}</h3>
            <h3>Status: {fundraiser.is_open ? "Open" : "Closed"}</h3>

            <img
                src={fundraiser.image}
                alt={fundraiser.title}
                style={{ maxWidth: "400px", borderRadius: "8px", margin: "1em 0" }}
            />

            <p>{fundraiser.description}</p>
            <h3>Goal: ${fundraiser.goal}</h3>

            <hr />

            {/* ✅ Existing pledges list stays */}
            <h3>Pledges:</h3>
            {fundraiser.pledges && fundraiser.pledges.length > 0 ? (
                <ul>
                    {fundraiser.pledges.map((pledgeData, key) => (
                        <li key={key}>
                            ${pledgeData.amount} from{" "}
                            {pledgeData.anonymous ? "Anonymous" : pledgeData.supporter}
                            {pledgeData.comment && (
                                <span> — “{pledgeData.comment}”</span>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No pledges yet. Be the first to support!</p>
            )}

            <hr />

            {/* ✅ Add the new pledge form */}
            <PledgeForm
                fundraiserId={fundraiser.id}
                onSuccess={() => window.location.reload()} // optional refresh on new pledge
            />
        </div>
    );
}

export default FundraiserPage;
