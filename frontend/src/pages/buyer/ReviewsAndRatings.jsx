import React, { useState } from "react";
import { Star, ThumbsDown, ThumbsUp } from "lucide-react";

const ReviewsAndRatings = () => {
  const [selectedProperty, setSelectedProperty] = useState("");
  const [rating, setRating] = useState(0);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewContent, setReviewContent] = useState("");

  const handleSubmit = () => {
    console.log({ selectedProperty, rating, reviewTitle, reviewContent });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Reviews & Ratings</h2>
        <p className="text-muted-foreground">Read and write reviews for properties</p>
      </div>
      <div className="flex items-center gap-4">
        <button className="bg-primary/5 border px-4 py-2">All Reviews</button>
        <button className="border px-4 py-2">My Reviews</button>
        <button className="border px-4 py-2">Write a Review</button>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="border p-4 rounded-lg shadow">
            <div className="flex justify-between">
              <div>
                <h3 className="font-bold">
                  {i % 3 === 0 ? "Riverside Villa" : i % 3 === 1 ? "Mountain View Cottage" : "Downtown Apartment"}
                </h3>
                <p className="text-gray-500 text-sm">
                  {i % 3 === 0 ? "123 River Road" : i % 3 === 1 ? "45 Mountain View" : "789 Main St"}
                </p>
              </div>
              <div className="flex">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className={`h-4 w-4 ${j < 5 - (i % 2) ? "text-yellow-500" : "text-gray-400"}`} />
                ))}
              </div>
            </div>
            <p className="text-sm mt-2">
              {i % 3 === 0
                ? "Beautiful property with amazing views. Highly recommended!"
                : i % 3 === 1
                ? "Great experience overall. The views are stunning!"
                : "Perfect location with modern amenities!"}
            </p>
            <div className="flex justify-between pt-2">
              <span className="text-sm text-gray-500">Was this review helpful?</span>
              <div className="flex gap-2">
                <button className="flex items-center text-gray-600 px-2">
                  <ThumbsUp className="h-4 w-4 mr-1" /> Yes ({i + 3})
                </button>
                <button className="flex items-center text-gray-600 px-2">
                  <ThumbsDown className="h-4 w-4 mr-1" /> No ({i})
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <hr className="my-8" />
      <div>
        <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
        <div className="border p-4 rounded-lg shadow">
          <label className="text-sm font-medium">Select a Property</label>
          <select
            className="w-full border rounded p-2 mt-1"
            value={selectedProperty}
            onChange={(e) => setSelectedProperty(e.target.value)}
          >
            <option value="">Select a property</option>
            <option value="riverside">Riverside Villa</option>
            <option value="mountain">Mountain View Cottage</option>
            <option value="downtown">Downtown Apartment</option>
          </select>
          <label className="text-sm font-medium mt-4">Rating</label>
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <button key={i} onClick={() => setRating(i + 1)} className={i < rating ? "text-yellow-500" : "text-gray-400"}>
                <Star className="h-6 w-6" />
              </button>
            ))}
          </div>
          <label className="text-sm font-medium mt-4">Review Title</label>
          <input
            type="text"
            className="w-full border rounded p-2 mt-1"
            value={reviewTitle}
            onChange={(e) => setReviewTitle(e.target.value)}
          />
          <label className="text-sm font-medium mt-4">Review</label>
          <textarea
            rows={4}
            className="w-full border rounded p-2 mt-1"
            value={reviewContent}
            onChange={(e) => setReviewContent(e.target.value)}
          ></textarea>
          <button className="bg-blue-600 text-white px-4 py-2 rounded mt-4" onClick={handleSubmit}>
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewsAndRatings;
