import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Itinerary from '@/models/Itinerary';

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    await connectDB();

    const itinerary = await Itinerary.findById(id);
    if (!itinerary) {
      return NextResponse.json({
        success: false,
        message: 'Itinerary not found',
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: itinerary,
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Failed to fetch itinerary',
      error: error.message,
    }, { status: 500 });
  }
}
