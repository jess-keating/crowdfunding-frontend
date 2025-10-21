import useFundraisers from "../hooks/use-fundraisers";
import FundraiserCard from "../components/FundraiserCard";
import "./HomePage.css";

function HomePage() {
    const { fundraisers, isLoading, error, refetch } = useFundraisers();

    if (isLoading) {
        return (
            <div className="page-wrap">
                <div className="muted">Loading fundraisers…</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="page-wrap">
                <div role="alert">
                    <p className="muted">Error loading fundraisers: {error.message}</p>
                        <button onClick={refetch} disabled={isLoading}>
                            {isLoading ? "Retrying…" : "Retry"}
                        </button>
                </div>
            </div>
        );
    }

    return (
        <div className="page-wrap">
            <div id="fundraiser-list">
                {fundraisers.map((fundraiserData, key) => {
                    return <FundraiserCard key={key} fundraiserData={fundraiserData} />;
                })}
            </div>
        </div>
    );
}

export default HomePage;