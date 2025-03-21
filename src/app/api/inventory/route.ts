import { NextRequest, NextResponse } from "next/server";
import { and, desc, eq, sql, SQL } from "drizzle-orm";
import { db } from "@/db";
import { inventory, products, locations } from "@/db/schema";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = Number(searchParams.get("limit") || "10");
    const offset = Number(searchParams.get("offset") || "0");
    const productId = searchParams.get("productId");
    const locationId = searchParams.get("locationId");

    // Build where clause
    const whereConditions: SQL<unknown>[] = [];
    
    if (productId) {
      whereConditions.push(eq(inventory.productId, productId));
    }
    
    if (locationId) {
      whereConditions.push(eq(inventory.locationId, locationId));
    }
    
    // Combine conditions
    let whereClause: SQL<unknown> | undefined = undefined;
    if (whereConditions.length > 0) {
      whereClause = and(...whereConditions);
    }

    const [inventoryItems, countResult] = await Promise.all([
      db.select({
        id: inventory.id,
        productId: inventory.productId,
        locationId: inventory.locationId,
        quantity: inventory.quantity,
        lotNumber: inventory.lotNumber,
        expirationDate: inventory.expirationDate,
        createdAt: inventory.createdAt,
        updatedAt: inventory.updatedAt,
        product: {
          id: products.id,
          name: products.name,
          sku: products.sku
        },
        location: {
          id: locations.id,
          name: locations.name
        }
      })
      .from(inventory)
      .leftJoin(products, eq(inventory.productId, products.id))
      .leftJoin(locations, eq(inventory.locationId, locations.id))
      .where(whereClause || sql`1=1`)
      .limit(limit)
      .offset(offset)
      .orderBy(desc(inventory.createdAt)),
      
      db.select({ count: sql<number>`count(*)` })
        .from(inventory)
        .where(whereClause || sql`1=1`)
    ]);

    const total = countResult[0].count;
    
    return NextResponse.json({
      inventory: inventoryItems,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total
      }
    });
  } catch (error) {
    console.error("Error fetching inventory:", error);
    return NextResponse.json(
      { error: "Failed to fetch inventory" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Check if product exists
    const product = await db.query.products.findFirst({
      where: eq(products.id, body.productId)
    });
    
    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 400 }
      );
    }
    
    // Check if location exists
    const location = await db.query.locations.findFirst({
      where: eq(locations.id, body.locationId)
    });
    
    if (!location) {
      return NextResponse.json(
        { error: "Location not found" },
        { status: 400 }
      );
    }
    
    const newInventoryItem = await db.insert(inventory)
      .values(body)
      .returning();
    
    return NextResponse.json(newInventoryItem[0], { status: 201 });
  } catch (error) {
    console.error("Error creating inventory item:", error);
    return NextResponse.json(
      { error: "Failed to create inventory item" },
      { status: 500 }
    );
  }
} 