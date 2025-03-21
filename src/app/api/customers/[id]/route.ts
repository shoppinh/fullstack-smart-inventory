import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { customers } from "@/db/schema";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    const customer = await db.query.customers.findFirst({
      where: eq(customers.id, id)
    });
    
    if (!customer) {
      return NextResponse.json(
        { error: "Customer not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(customer);
  } catch (error) {
    console.error("Error fetching customer:", error);
    return NextResponse.json(
      { error: "Failed to fetch customer" },
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
    
    const existingCustomer = await db.query.customers.findFirst({
      where: eq(customers.id, id)
    });
    
    if (!existingCustomer) {
      return NextResponse.json(
        { error: "Customer not found" },
        { status: 404 }
      );
    }
    
    const updatedCustomer = await db.update(customers)
      .set({
        ...body,
        updatedAt: new Date()
      })
      .where(eq(customers.id, id))
      .returning();
    
    return NextResponse.json(updatedCustomer[0]);
  } catch (error) {
    console.error("Error updating customer:", error);
    return NextResponse.json(
      { error: "Failed to update customer" },
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
    
    const existingCustomer = await db.query.customers.findFirst({
      where: eq(customers.id, id)
    });
    
    if (!existingCustomer) {
      return NextResponse.json(
        { error: "Customer not found" },
        { status: 404 }
      );
    }
    
    const deletedCustomer = await db.delete(customers)
      .where(eq(customers.id, id))
      .returning();
    
    return NextResponse.json(deletedCustomer[0]);
  } catch (error) {
    console.error("Error deleting customer:", error);
    return NextResponse.json(
      { error: "Failed to delete customer" },
      { status: 500 }
    );
  }
} 