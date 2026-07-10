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
  AdminUser
} from '../../../utils/models';
import {
  initialSpaces,
  initialBanners,
  initialStores,
  initialRestaurants,
  initialEvents,
  initialPromotions,
  initialRentalRequests
} from '../../../utils/mockData';

export async function GET() {
  try {
    await dbConnect();

    let seeded = false;

    // 1. Seed Banners
    const bannerCount = await Banner.countDocuments();
    if (bannerCount === 0) {
      const mapped = initialBanners.map(item => ({ ...item, _id: item.id }));
      await Banner.insertMany(mapped);
      seeded = true;
    }

    // 2. Seed Spaces
    const spaceCount = await Space.countDocuments();
    if (spaceCount === 0) {
      const mapped = initialSpaces.map(item => ({ ...item, _id: item.id }));
      await Space.insertMany(mapped);
      seeded = true;
    }

    // 3. Seed Stores
    const storeCount = await Store.countDocuments();
    if (storeCount === 0) {
      const mapped = initialStores.map(item => ({ ...item, _id: item.id }));
      await Store.insertMany(mapped);
      seeded = true;
    }

    // 4. Seed Restaurants
    const restaurantCount = await Restaurant.countDocuments();
    if (restaurantCount === 0) {
      const mapped = initialRestaurants.map(item => ({ ...item, _id: item.id }));
      await Restaurant.insertMany(mapped);
      seeded = true;
    }

    // 5. Seed Events
    const eventCount = await MallEvent.countDocuments();
    if (eventCount === 0) {
      const mapped = initialEvents.map(item => ({ ...item, _id: item.id }));
      await MallEvent.insertMany(mapped);
      seeded = true;
    }

    // 6. Seed Promotions
    const promoCount = await Promotion.countDocuments();
    if (promoCount === 0) {
      const mapped = initialPromotions.map(item => ({ ...item, _id: item.id }));
      await Promotion.insertMany(mapped);
      seeded = true;
    }

    // 7. Seed Rental Requests
    const reqCount = await RentalRequest.countDocuments();
    if (reqCount === 0) {
      const mapped = initialRentalRequests.map(item => ({ ...item, _id: item.id }));
      await RentalRequest.insertMany(mapped);
      seeded = true;
    }

    // 8. Seed Admin User
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
      message: seeded ? 'Database initialized and seeded successfully.' : 'Database already initialized.',
    });
  } catch (error: any) {
    console.error('Error seeding database:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to seed database'
    }, { status: 500 });
  }
}
