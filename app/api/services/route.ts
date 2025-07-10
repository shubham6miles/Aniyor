import { NextRequest, NextResponse } from 'next/server';

let services: any[] = [];

export async function GET() {
  return NextResponse.json({ services });
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const newService = { ...data, id: `service_${Date.now()}` };
  services.push(newService);
  return NextResponse.json({ success: true, service: newService });
}

export async function PUT(req: NextRequest) {
  const data = await req.json();
  services = services.map(s => s.id === data.id ? { ...s, ...data } : s);
  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  services = services.filter(s => s.id !== id);
  return NextResponse.json({ success: true });
} 