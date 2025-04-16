"use client";
import { getFeedback } from "@/lib/actions/feedbackActions";
import FeedbackCard from "@/pages/homepage/userFeedbacks/feedbackCard/FeedbackCard";
import { useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

const FeedbackSlider = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const controls = useAnimation();

  useEffect(() => {
    const fetchFeedbacks = async () => {
      const { data, error } = await getFeedback();
      if (error) {
        console.error("Error fetching feedbacks:", error);
      } else {
        setFeedbacks(data);
      }
    };

    fetchFeedbacks();
  }, []);

  useEffect(() => {
    controls.start("animate");
  }, []);

  console.log(feedbacks);

  const handlePause = () => controls.stop();
  const handlePlay = () => controls.start("animate");

  return (
    <section
      onMouseEnter={handlePause}
      onMouseLeave={handlePlay}
      className="py-5 overflow-hidden relative w-full border"
    >
      <div className="flex items-center w-max">
        <FeedbackCard feedbacks={feedbacks} controls={controls} />
        <FeedbackCard feedbacks={feedbacks} controls={controls} />
      </div>
    </section>
  );
};

export default FeedbackSlider;
