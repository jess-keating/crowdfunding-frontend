import useFundraisers from "../hooks/use-fundraisers";
import FundraiserCard from "../components/FundraiserCard";
import "./HomePage.css";

function HomePage() {
    const { fundraisers, isLoading, error } = useFundraisers();

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    // Sort fundraisers by date_created (newest first)
    const sortedFundraisers = [...fundraisers].sort((a, b) => {
        return new Date(b.date_created) - new Date(a.date_created);
    });

    return (
        <div className="page-wrap">
            <h1>Fundraisers</h1>
            <div className="fundraiser-grid">
                {sortedFundraisers.map((fundraiserData, key) => {
                    return (
                        <FundraiserCard
                            key={key}
                            fundraiserData={fundraiserData}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default HomePage;