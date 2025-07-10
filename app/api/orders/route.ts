import { NextRequest, NextResponse } from 'next/server';

// GET: List orders
export async function GET(req: NextRequest) {
  // TODO: Fetch orders for the authenticated seller
  return NextResponse.json({ message: 'List orders - coming soon' });
}

// PUT: Update order status
export async function PUT(req: NextRequest) {
  // TODO: Update order status for the authenticated seller
  return NextResponse.json({ message: 'Update order status - coming soon' });
} 