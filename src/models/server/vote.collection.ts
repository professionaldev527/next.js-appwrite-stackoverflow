import { Permission } from "node-appwrite";
import { db, voteCollection } from "../name";
import { databases } from "./config";

export default async function createVoteCollection() {
    // Creating Collection
    try {
        await databases.getCollection(db, voteCollection);
        console.log("Vote Collection already exists");
    } catch (error) {
        try {
            await databases.createCollection(db, voteCollection, voteCollection, [
                Permission.create("users"),
                Permission.read("any"),
                Permission.read("users"),
                Permission.update("users"),
                Permission.delete("users"),
            ]);
            console.log("Vote Collection Created");
        } catch (err: any) {
            if (err.code !== 409) console.error("Error creating vote collection", err);
        }
    }

    // Creating Attributes
    try {
        await databases.createEnumAttribute(db, voteCollection, "type", ["question", "answer"], true);
        console.log("Vote type attribute created");
    } catch (error: any) {
        if (error.code !== 409) console.error("Error creating vote type attribute:", error);
    }

    try {
        await databases.createStringAttribute(db, voteCollection, "typeId", 50, true);
        console.log("Vote typeId attribute created");
    } catch (error: any) {
        if (error.code !== 409) console.error("Error creating vote typeId attribute:", error);
    }

    try {
        await databases.createEnumAttribute(
            db,
            voteCollection,
            "voteStatus",
            ["upvoted", "downvoted"],
            true
        );
        console.log("Vote voteStatus attribute created");
    } catch (error: any) {
        if (error.code !== 409) console.error("Error creating vote voteStatus attribute:", error);
    }

    try {
        await databases.createStringAttribute(db, voteCollection, "votedById", 50, true);
        console.log("Vote votedById attribute created");
    } catch (error: any) {
        if (error.code !== 409) console.error("Error creating vote votedById attribute:", error);
    }

    console.log("Vote Attributes created, waiting for them to be available...");
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Creating Indexes
    try {
        await databases.createIndex(db, voteCollection, "type", "key", ["type"], ["asc"]);
        console.log("Vote type index created");
    } catch (error: any) {
        if (error.code !== 409) console.error("Error creating vote type index:", error);
    }

    try {
        await databases.createIndex(db, voteCollection, "typeId", "key", ["typeId"], ["asc"]);
        console.log("Vote typeId index created");
    } catch (error: any) {
        if (error.code !== 409) console.error("Error creating vote typeId index:", error);
    }

    try {
        await databases.createIndex(db, voteCollection, "voteStatus", "key", ["voteStatus"], ["asc"]);
        console.log("Vote voteStatus index created");
    } catch (error: any) {
        if (error.code !== 409) console.error("Error creating vote voteStatus index:", error);
    }

    try {
        await databases.createIndex(db, voteCollection, "votedById", "key", ["votedById"], ["asc"]);
        console.log("Vote votedById index created");
    } catch (error: any) {
        if (error.code !== 409) console.error("Error creating vote votedById index:", error);
    }
}
