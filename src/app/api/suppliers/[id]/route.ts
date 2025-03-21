import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { suppliers } from "@/db/schema";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    const supplier = await db.query.suppliers.findFirst({
      where: eq(suppliers.id, id)
    });
    
    if (!supplier) {
      return NextResponse.json(
        { error: "Supplier not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(supplier);
  } catch (error) {
    console.error("Error fetching supplier:", error);
    return NextResponse.json(
      { error: "Failed to fetch supplier" },
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
    
    const supplier = await db.query.suppliers.findFirst({
      where: eq(suppliers.id, id)
    });
    
    if (!supplier) {
      return NextResponse.json(
        { error: "Supplier not found" },
        { status: 404 }
      );
    }
    
    const updatedSupplier = await db.update(suppliers)
      .set({
        ...body,
        updatedAt: new Date()
      })
      .where(eq(suppliers.id, id))
      .returning();
    
    return NextResponse.json(updatedSupplier[0]);
  } catch (error) {
    console.error("Error updating supplier:", error);
    return NextResponse.json(
      { error: "Failed to update supplier" },
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
    
    const supplier = await db.query.suppliers.findFirst({
      where: eq(suppliers.id, id)
    });
    
    if (!supplier) {
      return NextResponse.json(
        { error: "Supplier not found" },
        { status: 404 }
      );
    }
    
    const deletedSupplier = await db.delete(suppliers)
      .where(eq(suppliers.id, id))
      .returning();
    
    return NextResponse.json(deletedSupplier[0]);
  } catch (error) {
    console.error("Error deleting supplier:", error);
    return NextResponse.json(
      { error: "Failed to delete supplier" },
      { status: 500 }
    );
  }
} 