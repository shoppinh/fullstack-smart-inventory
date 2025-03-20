import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { products } from "@/db/schema";
import { desc, ilike, or, sql } from "drizzle-orm";

// GET /api/products - Get all products
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = searchParams.get("limit") ? parseInt(searchParams.get("limit") as string) : 10;
    const offset = searchParams.get("offset") ? parseInt(searchParams.get("offset") as string) : 0;
    const search = searchParams.get("search") || "";

    let whereClause = undefined;
    
    if (search) {
      whereClause = or(
        ilike(products.name, `%${search}%`),
        ilike(products.sku, `%${search}%`)
      );
    }

    // Get products with search filter and pagination
    const productList = await db.select()
      .from(products)
      .where(whereClause)
      .orderBy(desc(products.updatedAt))
      .limit(limit)
      .offset(offset);

    // Count total products for pagination
    const countResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(products)
      .where(whereClause);
    
    const total = countResult[0].count;

    return NextResponse.json({
      products: productList,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total,
      },
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

// POST /api/products - Create a new product
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    const newProduct = await db
      .insert(products)
      .values({
        ...body,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();

    return NextResponse.json(newProduct[0], { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
} 