import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { inventory, products, locations } from "@/db/schema";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    const inventoryItem = await db.select({
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
    .where(eq(inventory.id, id))
    .limit(1);
    
    if (!inventoryItem || inventoryItem.length === 0) {
      return NextResponse.json(
        { error: "Inventory item not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(inventoryItem[0]);
  } catch (error) {
    console.error("Error fetching inventory item:", error);
    return NextResponse.json(
      { error: "Failed to fetch inventory item" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const body = await request.json();
    
    // Check if inventory item exists
    const inventoryItem = await db.query.inventory.findFirst({
      where: eq(inventory.id, id)
    });
    
    if (!inventoryItem) {
      return NextResponse.json(
        { error: "Inventory item not found" },
        { status: 404 }
      );
    }
    
    // If productId is being updated, check if the product exists
    if (body.productId && body.productId !== inventoryItem.productId) {
      const product = await db.query.products.findFirst({
        where: eq(products.id, body.productId)
      });
      
      if (!product) {
        return NextResponse.json(
          { error: "Product not found" },
          { status: 400 }
        );
      }
    }
    
    // If locationId is being updated, check if the location exists
    if (body.locationId && body.locationId !== inventoryItem.locationId) {
      const location = await db.query.locations.findFirst({
        where: eq(locations.id, body.locationId)
      });
      
      if (!location) {
        return NextResponse.json(
          { error: "Location not found" },
          { status: 400 }
        );
      }
    }
    
    const updatedInventoryItem = await db.update(inventory)
      .set({
        ...body,
        updatedAt: new Date()
      })
      .where(eq(inventory.id, id))
      .returning();
    
    return NextResponse.json(updatedInventoryItem[0]);
  } catch (error) {
    console.error("Error updating inventory item:", error);
    return NextResponse.json(
      { error: "Failed to update inventory item" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    const existingInventoryItem = await db.query.inventory.findFirst({
      where: eq(inventory.id, id)
    });
    
    if (!existingInventoryItem) {
      return NextResponse.json(
        { error: "Inventory item not found" },
        { status: 404 }
      );
    }
    
    const deletedInventoryItem = await db.delete(inventory)
      .where(eq(inventory.id, id))
      .returning();
    
    return NextResponse.json(deletedInventoryItem[0]);
  } catch (error) {
    console.error("Error deleting inventory item:", error);
    return NextResponse.json(
      { error: "Failed to delete inventory item" },
      { status: 500 }
    );
  }
} 