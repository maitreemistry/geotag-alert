import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (Array.isArray(body.reports)) {
      // Handle multiple offline reports
      const createdReports = await Promise.all(
        body.reports.map((report: any) =>
          prisma.report.create({
            data: {
              content: report.content,
              timestamp: new Date(report.timestamp),
              type: report.type,
            },
          })
        )
      );
      return NextResponse.json({ success: true, count: createdReports.length });
    }

    // Handle single report
    const { content, timestamp, type } = body;
    const report = await prisma.report.create({
      data: {
        content,
        timestamp: new Date(timestamp),
        type,
      },
    });

    return NextResponse.json({ success: true, report });
  } catch (error) {
    console.error('[REPORT ERROR]', error);
    return NextResponse.json({ success: false, error: 'Failed to store report.' }, { status: 500 });
  }
}

export async function GET() {
  const reports = await prisma.report.findMany({ orderBy: { timestamp: 'desc' } });
  return NextResponse.json({ reports });
}