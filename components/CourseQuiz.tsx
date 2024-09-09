"use client";

import { challengeOptions, challenges } from "@/db/schema";
import CourseQuizHeader from "./CourseQuizHeader";
import { useState, useTransition } from "react";
import QuestionBubble from "./QuestionBubble";
import Challenge from "./Challenge";
import CourseQuizFooter from "./CourseQuizFooter";
import { upsertChallengeProgress } from "@/actions/challenge-progress";
import { toast } from "sonner";

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
    const [pending, startTransition] = useTransition()
  const [hearts, setHearts] = useState(initialHearts);
  const [status, setStatus] = useState<"correct" | "wrong" | "none">("none");
  const [percentage, setPercentage] = useState(initailPercentage);
  const [challenges] = useState(initialLessonChallenges);
  const [activeIndex, setActiveIndex] = useState(() => {
    const uncompletedIndex = challenges.findIndex(
      (challenge) => !challenge.completed
    );
    return uncompletedIndex === -1 ? 0 : uncompletedIndex;
  });

  const [selectedOption, setSelectedOption] = useState<number>();
  const onSelect = (id: number) => {
    if (status !== "none") {
      return null;
    }
    setSelectedOption(id);
  };
  const challenge = challenges[activeIndex]; // current challenge
  const options = challenge?.challengeOptions ?? [];

  const OnNext = () => {
    setActiveIndex((current) => current + 1);
  };

  const onContinue = () => {
    if (!selectedOption) return;
    if (status === "wrong") {
      setStatus("none");
      setSelectedOption(undefined);
      return;
    }

    if (status === "correct") {
      OnNext();
      setStatus("none");
      setSelectedOption(undefined);
      return;
    }

    const correctOption = options.find((option) => option.correct);
    if (!correctOption) return;
      if (correctOption && correctOption.id === selectedOption) {
          startTransition(() => {
              upsertChallengeProgress(challenge.id).then((response) => {
                  if (response?.error === 'hearts') {
                      console.error("Missing hearts")
                      return
                  }
                  setStatus("correct")
                  setPercentage((prev) => prev + 100 / challenges.length)
                  // this is a practice
                  if (initailPercentage === 100) {
                      setHearts((prev) => Math.min(prev + 1, 5))
                  }
            }).catch(() => toast.error("Something went wrong. Try again"))
        })
    } else { 
      console.log("incorrect option");
    }
  };

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
              <Challenge
                options={options}
                onSelect={onSelect}
                status={status}
                selectedOption={selectedOption}
                disabled={false}
                type={challenge.type}
              />
            </div>
          </div>
        </div>
      </div>
      <CourseQuizFooter
        disabled={!selectedOption}
        status={status}
        onCheck={onContinue}
      />
    </>
  );
};

export default CourseQuiz;
