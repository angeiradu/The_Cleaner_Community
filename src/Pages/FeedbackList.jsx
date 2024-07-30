import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

export default function FeedbackList() {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      const db = getFirestore();
      const feedbackCollection = collection(db, 'feedback');
      const feedbackSnapshot = await getDocs(feedbackCollection);
      const feedbackList = feedbackSnapshot.docs.map(doc => doc.data());
      setFeedbacks(feedbackList);
    };

    fetchFeedbacks();
  }, []);

  const getOptionClass = (option) => {
    switch (option) {
      case 'Very Satisfied':
        return 'text-green-600'; // Green text color
      case 'Satisfied':
        return 'text-blue-600'; // Blue text color
      case 'Very Unsatisfied':
        return 'text-red-600'; // Red text color
      default:
        return 'text-gray-800'; // Default text color
    }
  };

  return (
    <div className="p-4">
      <div className="mb-4 text-2xl text-center font-bold">Feedback List</div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="border-b bg-gray-100">
              <th className="py-2 px-4 text-left font-bold">User Name</th>
              <th className="py-2 px-4 text-left font-bold">Option</th>
              <th className="py-2 px-4 text-left font-bold">Comment</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.length === 0 ? (
              <tr>
                <td colSpan="3" className="py-4 text-center">No feedback available</td>
              </tr>
            ) : (
              feedbacks.map((feedback, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2 px-4">{feedback.userName}</td>
                  <td className={`py-2 px-4 ${getOptionClass(feedback.option)}`}>
                    {feedback.option}
                  </td>
                  <td className="py-2 px-4">{feedback.comment}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
