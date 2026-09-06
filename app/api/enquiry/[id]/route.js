import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Enquiry from '@/models/Enquiry';

export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status, notes } = body;

    await connectDB();

    const updateData = {};
    if (status) updateData.status = status;
    if (notes !== undefined) updateData.notes = notes;

    const updatedEnquiry = await Enquiry.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedEnquiry) {
      return NextResponse.json({
        success: false,
        message: 'Enquiry record not found',
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Status updated successfully',
      data: updatedEnquiry,
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Failed to update enquiry status',
      error: error.message,
    }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    await connectDB();

    const deleted = await Enquiry.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({
        success: false,
        message: 'Record not found',
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Enquiry deleted successfully',
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Failed to delete record',
      error: error.message,
    }, { status: 500 });
  }
}
