import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Destination from '@/models/Destination';
import { indiaDestinations, internationalDestinations } from '@/data/destinations';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectDB();
    let destinations = await Destination.find({}).sort({ createdAt: -1 });

    // Seed initial database if empty
    if (destinations.length === 0) {
      const initialItems = [...indiaDestinations, ...internationalDestinations].map((d) => ({
        slug: d.id,
        title: d.title,
        category: d.category,
        location: d.location,
        price: d.price,
        duration: d.duration,
        image: d.image,
        description: d.description,
        highlights: d.highlights,
        isFeatured: true,
      }));

      await Destination.insertMany(initialItems);
      destinations = await Destination.find({}).sort({ createdAt: -1 });
    }

    return NextResponse.json({
      success: true,
      count: destinations.length,
      data: destinations,
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Failed to fetch destinations',
      error: error.message,
    }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { title, category, location, price, duration, image, description, highlights } = body;

    if (!title || !category || !location || !price || !image || !description) {
      return NextResponse.json({
        success: false,
        message: 'All required destination fields must be provided',
      }, { status: 400 });
    }

    await connectDB();
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') + '-' + Date.now().toString().slice(-4);

    const newDestination = await Destination.create({
      title,
      slug,
      category,
      location,
      price,
      duration: duration || '5 Days',
      image,
      description,
      highlights: Array.isArray(highlights) ? highlights : (highlights ? highlights.split(',').map((s) => s.trim()) : []),
      isFeatured: true,
    });

    return NextResponse.json({
      success: true,
      message: 'Destination added successfully',
      data: newDestination,
    }, { status: 201 });

  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Failed to create destination',
      error: error.message,
    }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, title, category, location, price, duration, image, description, highlights } = body;

    await connectDB();
    const updated = await Destination.findByIdAndUpdate(
      id,
      {
        $set: {
          title,
          category,
          location,
          price,
          duration,
          image,
          description,
          highlights: Array.isArray(highlights) ? highlights : (highlights ? highlights.split(',').map((s) => s.trim()) : []),
        },
      },
      { new: true, runValidators: true }
    );

    return NextResponse.json({
      success: true,
      message: 'Destination updated successfully',
      data: updated,
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Failed to update destination',
      error: error.message,
    }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    await connectDB();
    await Destination.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: 'Destination deleted successfully',
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Failed to delete destination',
      error: error.message,
    }, { status: 500 });
  }
}
