import CourseQuiz from '@/components/CourseQuiz'
import { getLesson, getUserProgress, getUserSubscription } from '@/db/queries'
import { redirect } from 'next/navigation'
import React from 'react'

const LessonPage = async () => {
    const lessonData = getLesson()
    const userProgressData = getUserProgress()
    const userSubcriptionData = getUserSubscription()
    const [lesson, userProgress, userSubcription] = await Promise.all([lessonData, userProgressData, userSubcriptionData])


    if (!lesson || !userProgress) {
        redirect('/learn')
    }

    const initialPercentage = lesson.challenges.filter((challenge) => challenge.completed).length / lesson.challenges.length * 100
  return (
      <div>
          <CourseQuiz
              initialLessonId={lesson.id}
              initialLessonChallenges={lesson.challenges}
              initialHearts={userProgress.hearts}
              initailPercentage={initialPercentage}
              userSubscription={userSubcription}
          />
    </div>
  )
}

export default LessonPage