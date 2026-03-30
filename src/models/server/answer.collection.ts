import { IndexType, Permission } from "node-appwrite";
import { answerCollection, db } from "../name";
import { databases } from "./config";

export default async function createAnswerCollection() {
  // Creating Collection
  try {
    await databases.getCollection(db, answerCollection);
    console.log("Answer Collection already exists");
  } catch (error) {
    try {
      await databases.createCollection(db, answerCollection, answerCollection, [
        Permission.create("users"),
        Permission.read("any"),
        Permission.read("users"),
        Permission.update("users"),
        Permission.delete("users"),
      ]);
      console.log("Answer Collection Created");
    } catch (err) {
      console.error("Error creating answer collection", err);
    }
  }

  // Creating Attributes
  try {
    await databases.createStringAttribute(
      db,
      answerCollection,
      "content",
      5000,
      true,
    );
    console.log("Answer content attribute created");
  } catch (error: any) {
    if (error.code !== 409)
      console.error("Error creating answer content attribute:", error);
  }

  try {
    await databases.createStringAttribute(
      db,
      answerCollection,
      "questionId",
      50,
      true,
    );
    console.log("Answer questionId attribute created");
  } catch (error: any) {
    if (error.code !== 409)
      console.error("Error creating answer questionId attribute:", error);
  }

  try {
    await databases.createStringAttribute(
      db,
      answerCollection,
      "authorId",
      50,
      true,
    );
    console.log("Answer authorId attribute created");
  } catch (error: any) {
    if (error.code !== 409)
      console.error("Error creating answer authorId attribute:", error);
  }

  console.log("Answer Attributes created, waiting for them to be available...");
  await new Promise((resolve) => setTimeout(resolve, 3000));

  // Creating Indexes
  try {
    await databases.createIndex(
      db,
      answerCollection,
      "content",
      IndexType.Fulltext,
      ["content"],
      ["asc"],
    );
    console.log("Answer content index created");
  } catch (error: any) {
    if (error.code !== 409)
      console.error("Error creating answer content index:", error);
  }

  try {
    await databases.createIndex(
      db,
      answerCollection,
      "questionId",
      IndexType.Key,
      ["questionId"],
      ["asc"],
    );
    console.log("Answer questionId index created");
  } catch (error: any) {
    if (error.code !== 409)
      console.error("Error creating answer questionId index:", error);
  }

  try {
    await databases.createIndex(
      db,
      answerCollection,
      "authorId",
      IndexType.Key,
      ["authorId"],
      ["asc"],
    );
    console.log("Answer authorId index created");
  } catch (error: any) {
    if (error.code !== 409)
      console.error("Error creating answer authorId index:", error);
  }
}
