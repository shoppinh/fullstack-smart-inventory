import { NextRequest, NextResponse } from "next/server";
import { desc, ilike, or, sql } from "drizzle-orm";
import { db } from "@/db";
import { suppliers } from "@/db/schema";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = Number(searchParams.get("limit") || "10");
    const offset = Number(searchParams.get("offset") || "0");
    const search = searchParams.get("search") || "";
    
    // Build where clause
    let whereClause = undefined;
    
    if (search) {
      whereClause = or(
        ilike(suppliers.name, `%${search}%`),
        ilike(suppliers.contactName || "", `%${search}%`),
        ilike(suppliers.email || "", `%${search}%`)
      );
    }
    
    const [supplierList, countResult] = await Promise.all([
      db.select()
        .from(suppliers)
        .where(whereClause || sql`1=1`)
        .limit(limit)
        .offset(offset)
        .orderBy(desc(suppliers.createdAt)),
      
      db.select({ count: sql<number>`count(*)` })
        .from(suppliers)
        .where(whereClause || sql`1=1`)
    ]);
    
    const total = countResult[0].count;
    
    return NextResponse.json({
      suppliers: supplierList,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total
      }
    });
  } catch (error) {
    console.error("Error fetching suppliers:", error);
    return NextResponse.json(
      { error: "Failed to fetch suppliers" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const newSupplier = await db.insert(suppliers)
      .values({
        ...body,
        createdAt: new Date(),
        updatedAt: new Date()
      })
      .returning();
    
    return NextResponse.json(newSupplier[0], { status: 201 });
  } catch (error) {
    console.error("Error creating supplier:", error);
    return NextResponse.json(
      { error: "Failed to create supplier" },
      { status: 500 }
    );
  }
} 