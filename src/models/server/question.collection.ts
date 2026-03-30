import { IndexType, Permission } from "node-appwrite";

import { db, questionCollection } from "../name";
import { databases } from "./config";

export default async function createQuestionCollection() {
  // create collection
  try {
    await databases.getCollection(db, questionCollection);
    console.log("Question collection already exists");
  } catch (error) {
    try {
      await databases.createCollection(
        db,
        questionCollection,
        questionCollection,
        [
          Permission.read("any"),
          Permission.read("users"),
          Permission.create("users"),
          Permission.update("users"),
          Permission.delete("users"),
        ],
      );
      console.log("Question collection is created");
    } catch (err: any) {
      if (err.code !== 409)
        console.error("Error creating question collection", err);
    }
  }

  //creating attributes
  try {
    await databases.createStringAttribute(
      db,
      questionCollection,
      "title",
      100,
      true,
    );
    console.log("Question title attribute created");
  } catch (error: any) {
    if (error.code !== 409)
      console.error("Error creating question title attribute:", error);
  }

  try {
    await databases.createStringAttribute(
      db,
      questionCollection,
      "content",
      5000,
      true,
    );
    console.log("Question content attribute created");
  } catch (error: any) {
    if (error.code !== 409)
      console.error("Error creating question content attribute:", error);
  }

  try {
    await databases.createStringAttribute(
      db,
      questionCollection,
      "authorId",
      50,
      true,
    );
    console.log("Question authorId attribute created");
  } catch (error: any) {
    if (error.code !== 409)
      console.error("Error creating question authorId attribute:", error);
  }

  try {
    await databases.createStringAttribute(
      db,
      questionCollection,
      "tags",
      50,
      true,
      undefined,
      true,
    );
    console.log("Question tags attribute created");
  } catch (error: any) {
    if (error.code !== 409)
      console.error("Error creating question tags attribute:", error);
  }

  try {
    await databases.createStringAttribute(
      db,
      questionCollection,
      "attachmentId",
      50,
      false,
    );
    console.log("Question attachmentId attribute created");
  } catch (error: any) {
    if (error.code !== 409)
      console.error("Error creating question attachmentId attribute:", error);
  }

  console.log(
    "Question Attributes created, waiting for them to be available...",
  );
  await new Promise((resolve) => setTimeout(resolve, 3000));

  // create Indexes
  try {
    await databases.createIndex(
      db,
      questionCollection,
      "title",
      IndexType.Fulltext,
      ["title"],
      ["asc"],
    );
    console.log("Question title index created");
  } catch (error: any) {
    if (error.code !== 409)
      console.error("Error creating question title index:", error);
  }

  try {
    await databases.createIndex(
      db,
      questionCollection,
      "content",
      IndexType.Fulltext,
      ["content"],
      ["asc"],
    );
    console.log("Question content index created");
  } catch (error: any) {
    if (error.code !== 409)
      console.error("Error creating question content index:", error);
  }

  try {
    await databases.createIndex(
      db,
      questionCollection,
      "authorId",
      IndexType.Key,
      ["authorId"],
      ["asc"],
    );
    console.log("Question authorId index created");
  } catch (error: any) {
    if (error.code !== 409)
      console.error("Error creating question authorId index:", error);
  }
}
