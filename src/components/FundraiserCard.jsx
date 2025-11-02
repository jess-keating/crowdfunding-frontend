import { Link } from "react-router-dom";
import "./FundraiserCard.css";

function FundraiserCard({ fundraiserData }) {
    const fundraiserId = fundraiserData.id;
    
    // Local placeholder from public folder
    const defaultImage = "/placeholder.png";
    
    const imageUrl = fundraiserData.image || defaultImage;

    return (
        <div className="fundraiser-card">
            <Link to={`/fundraiser/${fundraiserId}`}>
                <div className="card-media">
                    <img 
                        src={imageUrl} 
                        alt={fundraiserData.title}
                        onError={(e) => {
                            e.target.src = defaultImage;
                        }}
                    />
                </div>
                <div className="card-body">
                    <h3>{fundraiserData.title}</h3>
                    <p>{fundraiserData.description}</p>
                    <div className="card-meta">
                        <span>Goal: ${fundraiserData.goal}</span>
                        <span>{fundraiserData.is_open ? "🟢 Open" : "🔴 Closed"}</span>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default FundraiserCard;