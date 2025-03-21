import { NextRequest, NextResponse } from "next/server";
import { desc, ilike, or, sql, SQL } from "drizzle-orm";
import { db } from "@/db";
import { customers } from "@/db/schema";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = Number(searchParams.get("limit") || "10");
    const offset = Number(searchParams.get("offset") || "0");
    const search = searchParams.get("search") || "";

    let whereClause: SQL<unknown> | undefined = undefined;
    
    if (search) {
      whereClause = or(
        ilike(customers.name, `%${search}%`),
        ilike(customers.email, `%${search}%`),
        ilike(customers.company, `%${search}%`)
      );
    }

    const [customersList, countResult] = await Promise.all([
      db.select().from(customers)
        .where(whereClause || sql`1=1`)
        .limit(limit)
        .offset(offset)
        .orderBy(desc(customers.createdAt)),
      db.select({ count: sql<number>`count(*)` }).from(customers)
        .where(whereClause || sql`1=1`)
    ]);

    const total = countResult[0].count;
    
    return NextResponse.json({
      customers: customersList,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total
      }
    });
  } catch (error) {
    console.error("Error fetching customers:", error);
    return NextResponse.json(
      { error: "Failed to fetch customers" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const newCustomer = await db.insert(customers)
      .values(body)
      .returning();
    
    return NextResponse.json(newCustomer[0], { status: 201 });
  } catch (error) {
    console.error("Error creating customer:", error);
    return NextResponse.json(
      { error: "Failed to create customer" },
      { status: 500 }
    );
  }
} 