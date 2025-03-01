// import React, { useState, useEffect } from "react";
// import { Star, ThumbsDown, ThumbsUp } from "lucide-react";
// import { db, collection, addDoc, getDocs } from "../../Firebase/config";

// const ReviewsAndRatings = () => {
//   const [reviews, setReviews] = useState([]);
//   const [selectedProperty, setSelectedProperty] = useState("");
//   const [rating, setRating] = useState(0);
//   const [reviewTitle, setReviewTitle] = useState("");
//   const [reviewContent, setReviewContent] = useState("");

//   // Fetch reviews from Firestore
//   useEffect(() => {
//     const fetchReviews = async () => {
//       const querySnapshot = await getDocs(collection(db, "reviews"));
//       const fetchedReviews = querySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setReviews(fetchedReviews);
//     };

//     fetchReviews();
//   }, []);

//   // Submit a new review
//   const handleSubmit = async () => {
//     if (!selectedProperty || rating === 0 || !reviewTitle || !reviewContent) {
//       alert("Please fill all fields");
//       return;
//     }

//     const newReview = {
//       property: selectedProperty,
//       rating,
//       title: reviewTitle,
//       content: reviewContent,
//       helpful: 0,
//       notHelpful: 0,
//     };

//     await addDoc(collection(db, "reviews"), newReview);
//     setReviews([...reviews, newReview]);

//     // Clear form
//     setSelectedProperty("");
//     setRating(0);
//     setReviewTitle("");
//     setReviewContent("");
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
//       <h2 className="text-3xl font-bold text-gray-800">Reviews & Ratings</h2>
//       <p className="text-gray-500">Read and write reviews for properties</p>

//       <div className="flex justify-between my-4">
//         <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">All Reviews</button>
//         <button className="bg-gray-300 px-4 py-2 rounded-lg">My Reviews</button>
//         <button className="bg-green-500 text-white px-4 py-2 rounded-lg">Write a Review</button>
//       </div>

//       <div className="grid gap-6 md:grid-cols-2">
//         {reviews.map((review, i) => (
//           <div key={i} className="border p-4 rounded-lg shadow">
//             <h3 className="font-bold">{review.property}</h3>
//             <div className="flex">
//               {Array.from({ length: 5 }).map((_, j) => (
//                 <Star key={j} className={`h-4 w-4 ${j < review.rating ? "text-yellow-500" : "text-gray-400"}`} />
//               ))}
//             </div>
//             <p className="mt-2">{review.title}</p>
//             <p className="text-sm">{review.content}</p>
//             <div className="flex justify-between pt-2">
//               <span className="text-sm text-gray-500">Was this review helpful?</span>
//               <div className="flex gap-2">
//                 <button className="flex items-center text-gray-600 px-2">
//                   <ThumbsUp className="h-4 w-4 mr-1" /> Yes ({review.helpful})
//                 </button>
//                 <button className="flex items-center text-gray-600 px-2">
//                   <ThumbsDown className="h-4 w-4 mr-1" /> No ({review.notHelpful})
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       <hr className="my-8" />

//       <div className="bg-gray-100 p-6 rounded-lg">
//         <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
//         <label className="text-sm font-medium">Select a Property</label>
//         <select
//           className="w-full border rounded p-2 mt-1"
//           value={selectedProperty}
//           onChange={(e) => setSelectedProperty(e.target.value)}
//         >
//           <option value="">Select a property</option>
//           <option value="Riverside Villa">Riverside Villa</option>
//           <option value="Mountain View Cottage">Mountain View Cottage</option>
//           <option value="Downtown Apartment">Downtown Apartment</option>
//         </select>

//         <label className="text-sm font-medium mt-4">Rating</label>
//         <div className="flex gap-1">
//           {Array.from({ length: 5 }).map((_, i) => (
//             <button key={i} onClick={() => setRating(i + 1)} className={i < rating ? "text-yellow-500" : "text-gray-400"}>
//               <Star className="h-6 w-6" />
//             </button>
//           ))}
//         </div>

//         <label className="text-sm font-medium mt-4">Review Title</label>
//         <input
//           type="text"
//           className="w-full border rounded p-2 mt-1"
//           value={reviewTitle}
//           onChange={(e) => setReviewTitle(e.target.value)}
//         />

//         <label className="text-sm font-medium mt-4">Review</label>
//         <textarea
//           rows={4}
//           className="w-full border rounded p-2 mt-1"
//           value={reviewContent}
//           onChange={(e) => setReviewContent(e.target.value)}
//         ></textarea>

//         <button className="bg-blue-600 text-white px-4 py-2 rounded mt-4" onClick={handleSubmit}>
//           Submit Review
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ReviewsAndRatings;

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
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      <div className="text-center">
        <h2 className="text-4xl font-extrabold text-blue-700">Reviews & Ratings</h2>
        <p className="text-gray-600">Read and write reviews for properties</p>
      </div>
      <div className="flex items-center gap-4 justify-center">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600">All Reviews</button>
        <button className="border px-4 py-2 rounded-lg shadow-md hover:bg-gray-200">My Reviews</button>
        <button className="border px-4 py-2 rounded-lg shadow-md hover:bg-gray-200">Write a Review</button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="border p-6 rounded-lg shadow-lg bg-white">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-bold text-xl text-blue-700">
                  {i % 3 === 0 ? "Riverside Villa" : i % 3 === 1 ? "Mountain View Cottage" : "Downtown Apartment"}
                </h3>
                <p className="text-gray-500 text-sm">
                  {i % 3 === 0 ? "123 River Road" : i % 3 === 1 ? "45 Mountain View" : "789 Main St"}
                </p>
              </div>
              <div className="flex">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className={`h-5 w-5 ${j < 5 - (i % 2) ? "text-yellow-500" : "text-gray-400"}`} />
                ))}
              </div>
            </div>
            <p className="text-gray-700 mt-4">
              {i % 3 === 0
                ? "Beautiful property with amazing views. Highly recommended!"
                : i % 3 === 1
                ? "Great experience overall. The views are stunning!"
                : "Perfect location with modern amenities!"}
            </p>
            <div className="flex justify-between pt-4 text-gray-600">
              <span className="text-sm">Was this review helpful?</span>
              <div className="flex gap-2">
                <button className="flex items-center px-2 hover:text-green-600">
                  <ThumbsUp className="h-4 w-4 mr-1" /> Yes ({i + 3})
                </button>
                <button className="flex items-center px-2 hover:text-red-600">
                  <ThumbsDown className="h-4 w-4 mr-1" /> No ({i})
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <hr className="my-8 border-gray-300" />
      <div className="max-w-2xl mx-auto">
        <h3 className="text-2xl font-semibold text-center text-blue-700 mb-6">Write a Review</h3>
        <div className="border p-6 rounded-lg shadow-lg bg-white">
          <label className="text-sm font-medium text-gray-700">Select a Property</label>
          <select
            className="w-full border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedProperty}
            onChange={(e) => setSelectedProperty(e.target.value)}
          >
            <option value="">Select a property</option>
            <option value="riverside">Riverside Villa</option>
            <option value="mountain">Mountain View Cottage</option>
            <option value="downtown">Downtown Apartment</option>
          </select>
          <label className="text-sm font-medium text-gray-700 mt-4 block">Rating</label>
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <button key={i} onClick={() => setRating(i + 1)} className={i < rating ? "text-yellow-500" : "text-gray-400"}>
                <Star className="h-6 w-6" />
              </button>
            ))}
          </div>
          <label className="text-sm font-medium text-gray-700 mt-4 block">Review Title</label>
          <input
            type="text"
            className="w-full border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={reviewTitle}
            onChange={(e) => setReviewTitle(e.target.value)}
          />
          <label className="text-sm font-medium text-gray-700 mt-4 block">Review</label>
          <textarea
            rows={4}
            className="w-full border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={reviewContent}
            onChange={(e) => setReviewContent(e.target.value)}
          ></textarea>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-4 w-full hover:bg-blue-700" onClick={handleSubmit}>
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewsAndRatings;
