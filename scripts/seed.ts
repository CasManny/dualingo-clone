import { config } from "dotenv";
config({ path: ".env.local" }); //
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";
const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("seeding database");
    await db.delete(schema.courses), await db.delete(schema.userProgress);
    await db.delete(schema.units)
    await db.delete(schema.lessons)
    await db.delete(schema.challengeOptions)
    await db.delete(schema.challengeProgress)
      

      await db.insert(schema.courses).values([
          {
              id: 1,
              title: "spanish",
              imageSrc: "/es.svg"
          },
          {
              id: 2,
              title: "italian",
              imageSrc: "/it.svg"
          },
          {
              id: 3,
              title: "french",
              imageSrc: "/fr.svg"
          },
          {
              id: 4,
              title: "crotian",
              imageSrc: "/hr.svg"
          },
      ])
    await db.insert(schema.units).values([
      {
        id: 1,
        courseId: 1,
        title: "Unit 1",
        description: "Learn the basics of Spanish",
        order: 1
      }
    ])
    await db.insert(schema.lessons).values([
      {
        id: 1,
        unitId: 1, 
        order: 1,
        title: "Nouns"
      },
      {
        id: 2,
        unitId: 1, 
        order: 2,
        title: "Verbs"
      },
      {
        id: 3,
        unitId: 1, 
        order: 3,
        title: "Pronoun"
      },
      {
        id: 4,
        unitId: 1, 
        order: 4,
        title: "Pronoun"
      },
      {
        id: 5,
        unitId: 1, 
        order: 5,
        title: "Pronoun"
      },
    ])
    await db.insert(schema.challenges).values([
      {
        id: 1,
        lessonId: 1,
        type: "SELECT",
        order: 1,
        question: "Which one of these is the 'the man' ",
      },
    ])
    await db.insert(schema.challengeOptions).values([
      {
        id: 1,
        challengeId: 1,
        imageSrc: "/man.svg",
        correct: true,
        text: "el hombre",
        order: 1,
        audioSrc: "/es_man.mp3"
      },
      {
        id: 2,
        challengeId: 1,
        imageSrc: "/woman.svg",
        correct: false,
        text: "la mujer",
        order: 2,
        audioSrc: "/es_woman.mp3"
      },
      {
        id: 3,
        challengeId: 1,
        imageSrc: "/robot.svg",
        correct: false,
        text: "el robot",
        order: 2,
        audioSrc: "/es_robot.mp3"
      },
    ])
    console.log("seeding finished");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed the database");
  }
};

main()
