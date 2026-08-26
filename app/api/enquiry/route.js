import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Enquiry from '@/models/Enquiry';

/**
 * POST /api/enquiry
 * Server-side validated API route to create and persist travel booking enquiries
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const {
      fullName,
      countryCode = '+91',
      contactNumber,
      email,
      dateOfTravel,
      numberOfPeople,
      hotelCategory,
      numberOfChildren = 0,
    } = body;

    // 1. Server-side Input Validation
    if (!fullName || typeof fullName !== 'string' || !fullName.trim()) {
      return NextResponse.json(
        { success: false, message: 'Full name is required and must be text' },
        { status: 400 }
      );
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return NextResponse.json(
        { success: false, message: 'A valid email address is required' },
        { status: 400 }
      );
    }

    if (!contactNumber || !/^\d{7,15}$/.test(contactNumber.replace(/[\s-]/g, ''))) {
      return NextResponse.json(
        { success: false, message: 'A valid contact number is required (7 to 15 digits)' },
        { status: 400 }
      );
    }

    if (!dateOfTravel) {
      return NextResponse.json(
        { success: false, message: 'Date of travel is required' },
        { status: 400 }
      );
    }

    const travelDate = new Date(dateOfTravel);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (isNaN(travelDate.getTime()) || travelDate <= today) {
      return NextResponse.json(
        { success: false, message: 'Travel date must be a valid future date' },
        { status: 400 }
      );
    }

    const peopleCount = Number(numberOfPeople);
    if (isNaN(peopleCount) || peopleCount < 1) {
      return NextResponse.json(
        { success: false, message: 'Number of people must be at least 1' },
        { status: 400 }
      );
    }

    const childrenCount = Number(numberOfChildren);
    if (isNaN(childrenCount) || childrenCount < 0) {
      return NextResponse.json(
        { success: false, message: 'Number of children cannot be negative' },
        { status: 400 }
      );
    }

    const allowedCategories = ['Standard', 'Deluxe', 'Luxury'];
    if (!hotelCategory || !allowedCategories.includes(hotelCategory)) {
      return NextResponse.json(
        { success: false, message: 'Hotel category must be Standard, Deluxe, or Luxury' },
        { status: 400 }
      );
    }

    // 2. Connect to Database & Persist Record
    try {
      await connectToDatabase();
    } catch (dbError) {
      console.error('Database Connection Failure:', dbError);
      return NextResponse.json(
        { success: false, message: 'Database connection failed. Please try again later.' },
        { status: 500 }
      );
    }

    const newEnquiry = await Enquiry.create({
      fullName: fullName.trim(),
      countryCode: countryCode.trim(),
      contactNumber: contactNumber.trim(),
      email: email.trim().toLowerCase(),
      dateOfTravel: travelDate,
      numberOfPeople: peopleCount,
      hotelCategory,
      numberOfChildren: childrenCount,
      createdAt: new Date(),
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Enquiry submitted successfully',
        data: {
          id: newEnquiry._id,
          fullName: newEnquiry.fullName,
          email: newEnquiry.email,
          createdAt: newEnquiry.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('API Error in /api/enquiry:', error);
    return NextResponse.json(
      { success: false, message: 'Server error processing enquiry request' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/enquiry (Bonus Endpoint)
 * Retrieves list of stored travel enquiries for administrative verification
 */
export async function GET() {
  try {
    await connectToDatabase();
    const enquiries = await Enquiry.find({}).sort({ createdAt: -1 }).limit(50);

    return NextResponse.json(
      {
        success: true,
        count: enquiries.length,
        enquiries,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('API Error in GET /api/enquiry:', error);
    return NextResponse.json(
      { success: false, message: 'Could not fetch enquiries' },
      { status: 500 }
    );
  }
}
