import clientPromise from "@/lib/mongoClient";
import { Collection, Document, ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuid } from "uuid";

export interface Comment {
    id: string;
    content: string;
    username: string;
    imageurl: string;
    replies: Comment[];
}

export interface Feedback {
    _id: ObjectId;
    title: string;
    description: string;
    tags: string[];
    comments: Comment[];
    ups: number;
}

/**
 * Generic function to handle all crud operations
 * @param callback function to operate the CRUD
 * @returns the return of the callback function
 */
async function crud(callback: (collection: Collection<Document>) => unknown) {
    try {
        const mongoClient = await clientPromise;
        const db = mongoClient.db("prods");
        const collection = db.collection("feedbacks");
        return await callback(collection);
    } catch (err) {
        throw err;
    }
}

/**
 *  Get the feedbacks
 * @returns 10 feedbacks
 */
export async function GET() {
    try {
        const feedbacks = await crud(
            async (collection) => await collection.find().limit(10).toArray()
        );

        return NextResponse.json(feedbacks);
    } catch (err) {
        console.log(err);
    }
}

/**
 * Insert a feedback on mongodb database
 */
export async function POST(req: NextRequest) {
    try {
        const feedback = await req.json();

        const randomId = uuid().split("-").join("").slice(0, 24);
        const objid = new ObjectId(randomId);
        feedback._id = objid;

        await crud(async (collection) => {
            await collection.insertOne({
                ...feedback,
            });
        });

        return NextResponse.json({ message: "ok" });
    } catch (err) {
        console.log(err);
    }
}
