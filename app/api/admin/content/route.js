import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { getAdminData, saveAdminData } from '../../../../lib/admin-store';

async function ensureAdminAccess() {
  const cookieStore = cookies();
  if (cookieStore.get('africsis_admin')?.value !== 'authenticated') {
    return false;
  }

  return true;
}

export async function GET() {
  if (!(await ensureAdminAccess())) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await getAdminData();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message || 'Unable to load content.' }, { status: 500 });
  }
}

export async function PUT(request) {
  if (!(await ensureAdminAccess())) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const data = await saveAdminData(body || {});
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message || 'Unable to save content.' }, { status: 500 });
  }
}