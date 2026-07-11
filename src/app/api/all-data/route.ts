import { NextResponse } from 'next/server';
import dbConnect from '../../../utils/db';
import {
  Space,
  Banner,
  Store,
  Restaurant,
  MallEvent,
  Promotion,
  RentalRequest,
  serializeDoc,
  BlogPost
} from '../../../utils/models';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await dbConnect();

    // Fetch all datasets concurrently
    const [
      spacesRaw,
      bannersRaw,
      storesRaw,
      restaurantsRaw,
      eventsRaw,
      promotionsRaw,
      rentalRequestsRaw,
      blogPostsRaw
    ] = await Promise.all([
      Space.find({}),
      Banner.find({}),
      Store.find({}),
      Restaurant.find({}),
      MallEvent.find({}),
      Promotion.find({}),
      RentalRequest.find({}).sort({ date: -1 }),
      BlogPost.find({}).sort({ createdAt: -1 }) // Sort requests to show newest first
    ]);

    // Serialize documents
    const spaces = spacesRaw.map(serializeDoc);
    const banners = bannersRaw.map(serializeDoc);
    const stores = storesRaw.map(serializeDoc);
    const restaurants = restaurantsRaw.map(serializeDoc);
    const events = eventsRaw.map(serializeDoc);
    const promotions = promotionsRaw.map(serializeDoc);
    const rentalRequests = rentalRequestsRaw.map(serializeDoc);
    const blogPosts = blogPostsRaw.map(serializeDoc);

    return NextResponse.json({
      success: true,
      data: {
        spaces,
        banners,
        stores,
        restaurants,
        events,
        promotions,
        rentalRequests,
        blogPosts
      }
    });
  } catch (error: any) {
    console.error('Error fetching all data:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to fetch all data'
    }, { status: 500 });
  }
}
