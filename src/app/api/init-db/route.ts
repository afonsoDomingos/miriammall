import { NextResponse } from 'next/server';
import dbConnect from '../../../utils/db';
import bcrypt from 'bcryptjs';
import {
  Space,
  Banner,
  Store,
  Restaurant,
  MallEvent,
  Promotion,
  RentalRequest,
  AdminUser,
  BlogPost,
  Building,
  Note
} from '../../../utils/models';
import {
  initialSpaces,
  initialBanners,
  initialStores,
  initialRestaurants,
  initialEvents,
  initialPromotions,
  initialRentalRequests,
  initialBlogPosts,
  initialBuildings,
  initialNotes
} from '../../../utils/mockData';

export async function GET(req: Request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const reset = searchParams.get('reset') === 'true';

    let seeded = false;

    if (reset) {
      await Banner.deleteMany({});
      await Space.deleteMany({});
      await Store.deleteMany({});
      await Restaurant.deleteMany({});
      await MallEvent.deleteMany({});
      await Promotion.deleteMany({});
      await RentalRequest.deleteMany({});
      await AdminUser.deleteMany({});
      await BlogPost.deleteMany({});
      await Building.deleteMany({});
      await Note.deleteMany({});
    }

    // Seed Admin User if not existing
    const adminExists = await AdminUser.findOne({ email: 'admin@miriammall.com' });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('@Admin123@', 10);
      const admin = new AdminUser({
        _id: `admin-${Date.now()}`,
        email: 'admin@miriammall.com',
        password: hashedPassword
      });
      await admin.save();
      seeded = true;
    }

    return NextResponse.json({
      success: true,
      message: seeded ? 'Database initialized with Admin user.' : 'Database already initialized.',
      seeded
    });
  } catch (error: any) {
    console.error('Database init error:', error);
    return NextResponse.json({ success: false, error: error.message || 'Database init failed' }, { status: 500 });
  }
}
