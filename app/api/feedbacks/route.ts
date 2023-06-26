import clientPromise from "@/lib/mongoClient";
import { Collection, Document, ObjectId } from "mongodb";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuid } from "uuid";

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
export async function GET(req: NextRequest) {
    try {
        //getting the search params (e.g url?param=value)
        const { searchParams } = new URL(req.url);

        const feedbackId = searchParams.get("feedbackId");

        //if there is a feedbackid, it means that the user wants an specif feedback
        if (feedbackId) {
            const objId = new ObjectId(feedbackId);
            const feedback = await crud(
                async (collection) =>
                    await collection.find({ _id: objId }).toArray()
            );

            return NextResponse.json(feedback);
        }

        //in general the 10 documents are returned by default (if no feedback is specified)
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
        const tag = req.nextUrl.searchParams.get("tag");

        //revalidating the static generation of the home page
        if (tag) revalidateTag(tag);

        const feedback = await req.json();

        //generating and id for the document
        const randomId = uuid().split("-").join("").slice(0, 24);
        const objid = new ObjectId(randomId);
        feedback._id = objid;

        //inserting the feedback on the database
        await crud(async (collection) => {
            await collection.insertOne({
                ...feedback,
            });
        });

        return NextResponse.json({ message: "ok" });
    } catch (err) {
        throw err;
    }
}

/*
Routw that edit some document in the mongodb database. In fact this is the route used to update comments and replies on an specific feedback
 */
export async function PUT(req: NextRequest) {
    try {
        const feedbackId = req.nextUrl.searchParams.get("feedbackId");
        const comments = await req.json();

        //revalidating the static generation of the home page
        revalidateTag("feedbacks");

        //updating the document
        await crud(async (collection) => {
            await collection.updateOne(
                { _id: new ObjectId(feedbackId!) },
                { $set: { comments: comments } }
            );
        });

        return NextResponse.json({ message: "ok" });
    } catch (err) {
        throw err;
    }
}
