"use client"
import { courses, userProgress } from "@/db/schema";
import CourseCard from "./CourseCard";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { upsertUserProgress } from "@/actions/user-progress";
import { toast } from "sonner";

type Props = {
  courses: (typeof courses.$inferSelect)[];
  activeCourseId?: typeof userProgress.$inferSelect.activeCourseId;
};
const CourseList = ({ courses, activeCourseId }: Props) => {
  const router = useRouter()
  const [pending, startTransition] = useTransition()

  const onClick = (id: number) => {
    if (pending) return;
    if (id === activeCourseId) {
      return router.push("/learn")
    }

    startTransition(() => {
      upsertUserProgress(id)
      .catch(() => toast.error("something went wrong"))
    })
  }
  return (
    <div className="gap-4 pt-6 grid grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))]">
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          id={course.id}
          title={course.title}
          imageSrc={course.imageSrc}
          onClick={onClick}
          disabled={pending}
          active={course.id === activeCourseId}
        />
      ))}
    </div>
  );
};

export default CourseList;
