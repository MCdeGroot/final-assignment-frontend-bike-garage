import React from "react";
import "../../helper/generateColorScale";
import "./RideReview.css"
import {generateColorScale} from "../../helper/generateColorScale";
function RideReview({ review }) {
    const minReviewValue = 1; // Minimumwaarde voor de review
    const maxReviewValue = 10; // Maximumwaarde voor de review

    const colorScale = generateColorScale(minReviewValue, maxReviewValue);
    const reviewColorClass = `review-color-${review}`;

    return (
        <div className={`ride-review-wrapper ${colorScale}`}>
            {review !== null && review !== undefined && <span>{review}</span>}
        </div>
    );
}
export default RideReview;