import { NextResponse } from 'next/server';
import { getSiteContent } from '../../../lib/site-content';

export async function GET() {
  try {
    const content = await getSiteContent();
    return NextResponse.json({
      success: true,
      database: content.source,
      content,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        database: 'unavailable',
        message: 'Content could not be loaded.',
        error: error.message,
      },
      { status: 500 }
    );
  }
}
