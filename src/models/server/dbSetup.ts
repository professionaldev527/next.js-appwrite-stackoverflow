import { db } from "../name";
import createAnswerCollection from "./answer.collection";
import createCommentCollection from "./comment.collection";
import createQuestionCollection from "./question.collection";
import createVoteCollection from "./vote.collection";

import { databases } from "./config";

export default async function getOrCreateDB(){
  try {
    await databases.get(db)
    // console.log("Database connection")
  } catch (error) {
    try {
      await databases.create(db, db)
      console.log("database created")
    } catch (error: any) {
      if (error.code !== 409) console.error("Error creating databases", error)
    }
  }

  // Ensure collections and attributes exist
  await createQuestionCollection()
  await createAnswerCollection()
  await createCommentCollection()
  await createVoteCollection()
  
  return databases
}