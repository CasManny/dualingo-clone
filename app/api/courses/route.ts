import db from "@/db/drizzle";
import { isAdmin } from "@/lib/admin";
import { NextResponse } from "next/server";

export const GET = async () => {
    const admin = isAdmin()
    if (!admin) {
        return new NextResponse("Unauthorised", { status: 401})
    }
    const data = await db.query.courses.findMany({})
    return NextResponse.json(data)
}