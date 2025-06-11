import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const search = searchParams.get("search");
    const page = searchParams.get("page");
    const res = await fetch(
        `https://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&s=${search}&page=${page}`
    );

    const data = await res.json();
    return NextResponse.json(data);
}
