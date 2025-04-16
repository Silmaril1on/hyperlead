"use client";
import CardContainer from "@/components/containers/CardContainer";
import Stars from "./Stars";
import FlexBox from "@/components/containers/FlexBox";
import Author from "./Author";
import SubTitle from "@/components/SubTitle";
import { motion } from "framer-motion";
import { infinityScroll } from "@/animationValues/motionVariants";

const FeedbackCard = ({ feedbacks, controls }) => {
  return (
    <motion.div
      animate={controls}
      variants={infinityScroll}
      className="flex items-center"
    >
      {feedbacks.map((item) => {
        const { header, review } = item;
        return (
          <CardContainer
            className="flex flex-col justify-between overflow-hidden w-[350px] mx-2 h-80"
            type="light"
            key={item.id}
          >
            <div>
              <Stars item={item} />
              <FlexBox type="column-start">
                <SubTitle className="capitalize">{header}</SubTitle>
                <p className="text-[13px] whitespace-pre-wrap">{review}</p>
              </FlexBox>
            </div>
            <Author item={item} />
          </CardContainer>
        );
      })}
    </motion.div>
  );
};

export default FeedbackCard;
