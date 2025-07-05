
// // API Route - app/api/alert/route.ts
// import { NextResponse } from 'next/server';

// export async function POST(request: Request) {
//   const data = await request.json();
//   console.log('[ALERT]', data); // Replace with DB insertion and notification logic
//   return NextResponse.json({ success: true });
// }

// app/api/alert/route.ts - stores geo-tagged alert in database
import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { lat, lng, timestamp, type } = await request.json();

    const alert = await prisma.alert.create({
      data: {
        latitude: lat,
        longitude: lng,
        timestamp,
        type,
      },
    });

    return NextResponse.json({ success: true, alert });
  } catch (error) {
    console.error('[ALERT ERROR]', error);
    return NextResponse.json({ success: false, error: 'Failed to store alert.' }, { status: 500 });
  }
}

export async function GET() {
  const alerts = await prisma.alert.findMany({ orderBy: { timestamp: 'desc' } });
  return NextResponse.json({ alerts });
}
