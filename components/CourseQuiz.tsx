"use client";

import { challengeOptions, challenges, userSubscription } from "@/db/schema";
import Confetti from 'react-confetti'
import { useAudio, useWindowSize, useMount} from 'react-use'
import CourseQuizHeader from "./CourseQuizHeader";
import { useState, useTransition } from "react";
import QuestionBubble from "./QuestionBubble";
import Challenge from "./Challenge";
import CourseQuizFooter from "./CourseQuizFooter";
import { upsertChallengeProgress } from "@/actions/challenge-progress";
import { toast } from "sonner";
import { reduceHearts } from "@/actions/user-progress";
import Image from "next/image";
import ResultCard from "./ResultCard";
import Footer from "./Footer";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { useHeartModal } from "@/store/use-heart-modal";
import { usePracticeModal } from "@/store/use-practice-modal";

type Props = {
  initailPercentage: number;
  initialHearts: number;
  initialLessonId: number;
  initialLessonChallenges: (typeof challenges.$inferSelect & {
    completed: boolean;
    challengeOptions: (typeof challengeOptions.$inferSelect)[];
  })[];
  userSubscription: typeof userSubscription.$inferSelect & {
    isActive: boolean
  } | null
};
const CourseQuiz = ({
  initialHearts,
  initailPercentage,
  initialLessonChallenges,
  initialLessonId,
  userSubscription,
}: Props) => {
  const [finishAudio] = useAudio({src: "/finish.mp3", autoPlay: true})
  const { width, height } = useWindowSize()
  const { open: openHeartsModal } = useHeartModal()
  const {open: openPracticeModal} = usePracticeModal()
  const [lessonId, setLessonId] = useState(() => {
    return initailPercentage === 100 ? 0 : initailPercentage
  })
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const [correctAudio, _c, correctControls] = useAudio({ src: "/correct.wav" })
  const [incorrectAudion, _i, inCorrectControls] = useAudio({src: "/incorrect.wav"})
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

  useMount(() => {
    if (initailPercentage === 100) {
      openPracticeModal()
    }
  })

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
                      openHeartsModal()
                      return
                  }
                correctControls.play()
                  setStatus("correct")
                  setPercentage((prev) => prev + 100 / challenges.length)
                  // this is a practice
                  if (initailPercentage === 100) {
                      setHearts((prev) => Math.min(prev + 1, 5))
                  }
            }).catch(() => toast.error("Something went wrong. Try again"))
        })
      } else { 
        startTransition(() => {
          reduceHearts(challenge.id).then((response) => {
            if (response?.error === 'hearts') {
              openHeartsModal()
              return 
            }
            inCorrectControls.play()
            setStatus('wrong')
            if (!response?.error) {
              setHearts((prev) => Math.max(prev - 1, 0))
            }
          }).catch(() => toast.error("Something went wrong"))

        })
    }
  };

  if (!challenge) {
    return (
      <>
        {finishAudio}
        <Confetti recycle={false} numberOfPieces={500} tweenDuration={10000} width={width} height={height} />
        <div className="flex flex-col gap-y-4 lg:gap-y-8 max-w-lg mx-auto text-center items-center justify-center h-full">
          <Image src={'/finish.svg'} alt="finish" className="hidden lg:block" height={100} width={100} />
          <Image src={'/finish.svg'} alt="finish" className="lg:hidden block" height={50} width={50} />
          <h1 className="text-xl lg:text-3xl font-bold text-neutral-700">Great Job! <br /> You've completed the lesson</h1>
          <div className="flex items-center gap-x-4 w-full">
              <ResultCard varaint="points" value={challenges.length * 10} />
              <ResultCard varaint="hearts" value={hearts} />
          </div>
        </div>
        <CourseQuizFooter lessonId={lessonId} status="completed" onCheck={() => router.push("/learn")} />
      </>
    )
  }

  const title =
    challenge.type === "ASSIST"
      ? "Select the correct meaning"
      : challenge.question;
  return (
    <>
      {incorrectAudion}
      {correctAudio}
      <CourseQuizHeader
        hearts={hearts}
        percentage={percentage}
        hasActiveSubscription={!!userSubscription?.isActive}
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
                disabled={pending}
                type={challenge.type}
              />
            </div>
          </div>
        </div>
      </div>
      <CourseQuizFooter
        disabled={pending || !selectedOption}
        status={status}
        onCheck={onContinue}
      />
    </>
  );
};

export default CourseQuiz;
