import { NextRequest, NextResponse } from 'next/server';

// GET: List content (homepage, FAQs, categories, pricing plans)
export async function GET(req: NextRequest) {
  // TODO: Fetch content for admin CMS
  return NextResponse.json({ message: 'List content - coming soon' });
}

// POST: Create content
export async function POST(req: NextRequest) {
  // TODO: Create new content (admin only)
  return NextResponse.json({ message: 'Create content - coming soon' });
}

// PUT: Update content
export async function PUT(req: NextRequest) {
  // TODO: Update content (admin only)
  return NextResponse.json({ message: 'Update content - coming soon' });
}

// DELETE: Delete content
export async function DELETE(req: NextRequest) {
  // TODO: Delete content (admin only)
  return NextResponse.json({ message: 'Delete content - coming soon' });
} 