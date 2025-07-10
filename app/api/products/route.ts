import { NextRequest, NextResponse } from 'next/server';

// GET: List products
export async function GET(req: NextRequest) {
  // TODO: Fetch products for the authenticated seller
  return NextResponse.json({ message: 'List products - coming soon' });
}

// POST: Create product
export async function POST(req: NextRequest) {
  // TODO: Create a new product for the authenticated seller
  return NextResponse.json({ message: 'Create product - coming soon' });
}

// PUT: Update product
export async function PUT(req: NextRequest) {
  // TODO: Update a product for the authenticated seller
  return NextResponse.json({ message: 'Update product - coming soon' });
}

// DELETE: Delete product
export async function DELETE(req: NextRequest) {
  // TODO: Delete a product for the authenticated seller
  return NextResponse.json({ message: 'Delete product - coming soon' });
} 