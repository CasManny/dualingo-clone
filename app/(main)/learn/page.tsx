import CourseUnit from "@/components/CourseUnit";
import FeedHeader from "@/components/FeedHeader";
import FeedWrapper from "@/components/FeedWrapper";
import StickyWrapper from "@/components/StickyWrapper";
import UserProgress from "@/components/UserProgress";
import { getCourseProgress, getLessonPercentage, getUnits, getUserProgress } from "@/db/queries";
import { lessons, units as unitsSchema } from "@/db/schema";
import { redirect } from "next/navigation";

const LearnPage = async () => {
  const userProgressData = getUserProgress();
  const unitsData = getUnits();
  const courseProgressData = getCourseProgress()
  const lessonPercentageData = getLessonPercentage()

  const [userProgress, units, courseProgress, lessonPercentage] = await Promise.all([
    userProgressData,
    unitsData,
    courseProgressData,
    lessonPercentageData
  ]);

  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }
  if (!courseProgress) {
    redirect("/courses")
  }
  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubcription={false}
        />
      </StickyWrapper>
      <FeedWrapper>
        <FeedHeader title={userProgress.activeCourse.title} />
        {units.map((unit) => (
          <div className="mb-10" key={unit.id}>
            <CourseUnit
              id={unit.id}
              order={unit.order}
              description={unit.description}
              title={unit.title}
              lessons={unit.lessons}
              activeLesson={courseProgress.activeLesson as typeof lessons.$inferSelect & { unit: typeof unitsSchema.$inferSelect} | undefined}
              activeLessonPercentage={lessonPercentage}
            />
          </div>
        ))}
      </FeedWrapper>
    </div>
  );
};

export default LearnPage;
