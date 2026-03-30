import { Permission, IndexType } from "node-appwrite";
import { commentCollection, db } from "../name";
import { databases } from "./config";

export default async function createCommentCollection() {
  // Creating Collection
  try {
    await databases.getCollection(db, commentCollection);
    console.log("Comment Collection already exists");
  } catch (error) {
    try {
      await databases.createCollection(
        db,
        commentCollection,
        commentCollection,
        [
          Permission.create("users"),
          Permission.read("any"),
          Permission.read("users"),
          Permission.update("users"),
          Permission.delete("users"),
        ],
      );
      console.log("Comment Collection Created");
    } catch (err) {
      console.error("Error creating comment collection", err);
    }
  }

  // Creating Attributes
  try {
    await databases.createStringAttribute(
      db,
      commentCollection,
      "content",
      5000,
      true,
    );
    console.log("Comment content attribute created");
  } catch (error: any) {
    if (error.code !== 409)
      console.error("Error creating comment content attribute:", error);
  }

  try {
    await databases.createEnumAttribute(
      db,
      commentCollection,
      "type",
      ["answer", "question"],
      true,
    );
    console.log("Comment type attribute created");
  } catch (error: any) {
    if (error.code !== 409)
      console.error("Error creating comment type attribute:", error);
  }

  try {
    await databases.createStringAttribute(
      db,
      commentCollection,
      "typeId",
      50,
      true,
    );
    console.log("Comment typeId attribute created");
  } catch (error: any) {
    if (error.code !== 409)
      console.error("Error creating comment typeId attribute:", error);
  }

  try {
    await databases.createStringAttribute(
      db,
      commentCollection,
      "authorId",
      50,
      true,
    );
    console.log("Comment authorId attribute created");
  } catch (error: any) {
    if (error.code !== 409)
      console.error("Error creating comment authorId attribute:", error);
  }

  console.log(
    "Comment Attributes created, waiting for them to be available...",
  );
  await new Promise((resolve) => setTimeout(resolve, 3000));

  // Creating Indexes
  try {
    await databases.createIndex(
      db,
      commentCollection,
      "content",
      IndexType.Fulltext,
      ["content"],
      ["asc"],
    );
    console.log("Comment content index created");
  } catch (error: any) {
    if (error.code !== 409)
      console.error("Error creating comment content index:", error);
  }

  try {
    await databases.createIndex(
      db,
      commentCollection,
      "type",
      IndexType.Key,
      ["type"],
      ["asc"],
    );
    console.log("Comment type index created");
  } catch (error: any) {
    if (error.code !== 409)
      console.error("Error creating comment type index:", error);
  }

  try {
    await databases.createIndex(
      db,
      commentCollection,
      "typeId",
      IndexType.Key,
      ["typeId"],
      ["asc"],
    );
    console.log("Comment typeId index created");
  } catch (error: any) {
    if (error.code !== 409)
      console.error("Error creating comment typeId index:", error);
  }

  try {
    await databases.createIndex(
      db,
      commentCollection,
      "authorId",
      IndexType.Key,
      ["authorId"],
      ["asc"],
    );
    console.log("Comment authorId index created");
  } catch (error: any) {
    if (error.code !== 409)
      console.error("Error creating comment authorId index:", error);
  }
}
