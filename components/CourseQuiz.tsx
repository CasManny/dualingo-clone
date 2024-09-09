"use client";

import { challengeOptions, challenges } from "@/db/schema";
import CourseQuizHeader from "./CourseQuizHeader";
import { useState } from "react";
import QuestionBubble from "./QuestionBubble";
import Challenge from "./Challenge";

type Props = {
  initailPercentage: number;
  initialHearts: number;
  initialLessonId: number;
  initialLessonChallenges: (typeof challenges.$inferSelect & {
    completed: boolean;
    challengeOptions: (typeof challengeOptions.$inferSelect)[];
  })[];
  userSubscription: any;
};
const CourseQuiz = ({
  initialHearts,
  initailPercentage,
  initialLessonChallenges,
  initialLessonId,
  userSubscription,
}: Props) => {
  const [hearts, setHearts] = useState(initialHearts);
  const [percentage, setPercentage] = useState(initailPercentage);
  const [challenges] = useState(initialLessonChallenges);
  const [activeIndex, setActiveIndex] = useState(() => {
    const uncompletedIndex = challenges.findIndex(
      (challenge) => !challenge.completed
    );
    return uncompletedIndex === -1 ? 0 : uncompletedIndex;
  });
  const challenge = challenges[activeIndex]; // current challenge
  const options = challenge?.challengeOptions ?? [];
  const title =
    challenge.type === "ASSIST"
      ? "Select the correct meaning"
      : challenge.question;
  return (
    <>
      <CourseQuizHeader
        hearts={hearts}
        percentage={percentage}
        hasActiveSubscription={!!userSubscription?.active}
      />
      <div className="flex-1">
        <div className="h-screen flex items-center justify-center">
          <div className="lg:min-h-[350px] lg:w-[600px] w-full px-6 lg:px-0 flex flex-col gap-y-12">
            <h1 className="text-lg lg:text-3xl text-center lg:text-start font-bold text-neutral-700">
              {title}
            </h1>
            <div className="">
              {challenge.type === "ASSIST" && (
                <QuestionBubble question={challenge.question} />
              )}
              <Challenge options={options} onSelect={() => {}} status="none" selectedOption={undefined} disabled={false} type={challenge.type} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseQuiz;
