import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Itinerary from '@/models/Itinerary';

// Smart itinerary generator
function generateFallbackItinerary(prefs) {
  const { destinationType, travelStyle, budgetCategory, durationDays = 5, adults = 2, children = 0 } = prefs;

  const isIndia = destinationType === 'India' || (!destinationType && Math.random() > 0.5);
  const isSafari = travelStyle?.toLowerCase().includes('safari') || travelStyle?.toLowerCase().includes('wildlife');
  const isBackwaters = travelStyle?.toLowerCase().includes('backwater') || travelStyle?.toLowerCase().includes('kerala');

  let destinationName = isIndia 
    ? (isSafari ? 'Bandhavgarh & Kanha Tiger Reserve' : (isBackwaters ? 'Kerala Backwaters & Munnar' : 'Ladakh & Pangong Tso'))
    : (isSafari ? 'Masai Mara & Serengeti Safari' : 'Vietnam & Ha Long Bay Cruise');

  let baseCostPerDay = budgetCategory === 'Luxury' ? 18000 : (budgetCategory === 'Budget' ? 6500 : 11500);
  let totalCost = baseCostPerDay * durationDays * adults;

  const days = [];
  for (let i = 1; i <= Math.min(durationDays, 10); i++) {
    if (i === 1) {
      days.push({
        day: 1,
        title: `Arrival & Welcome at ${destinationName.split('&')[0].trim()}`,
        morning: `Private luxury airport pick-up and check-in to your vetted boutique resort.`,
        afternoon: `Relaxation and orientation session with your dedicated local travel guide.`,
        evening: `Traditional welcome dinner featuring authentic native regional cuisine under the stars.`,
        highlight: `Exclusive welcome hamper & sunset orientation walkthrough.`
      });
    } else if (i === Math.min(durationDays, 10)) {
      days.push({
        day: i,
        title: `Farewell & Departure Journey`,
        morning: `Leisurely breakfast at resort lounge followed by souvenir shopping at artisan markets.`,
        afternoon: `Check-out and private transfer to airport with handcrafted memory keepsake.`,
        evening: `Departure flight with lifelong memories of your Travel Unbounded experience.`,
        highlight: `Native farewell gift & priority airport escort.`
      });
    } else if (isSafari) {
      days.push({
        day: i,
        title: i % 2 === 0 ? `Dawn Game Drive & Big Cat Tracking` : `Guided Wilderness Walk & Reserve Exploration`,
        morning: `4:30 AM sunrise jeep safari led by naturalists to track tigers, leopards, and native wildlife.`,
        afternoon: `Bush lunch near natural waterhole followed by afternoon relaxation at eco-lodge pool.`,
        evening: `Sunset game drive, campfire storytelling, and stargazing with resident wildlife expert.`,
        highlight: `Exclusive open 4x4 safari vehicle access with high-resolution wildlife binoculars.`
      });
    } else if (isBackwaters) {
      days.push({
        day: i,
        title: i % 2 === 0 ? `Houseboat Cruise along Vembanad Lake` : `Spice Plantation Tour & Tea Estate Walk`,
        morning: `Morning yoga session overlooking tea gardens followed by fresh coconut tasting.`,
        afternoon: `Private houseboat cruise through palm-fringed backwaters with traditional chef meals.`,
        evening: `Kathakali cultural performance and Ayurvedic wellness session.`,
        highlight: `Private traditional wooden houseboat with dedicated butler and chef.`
      });
    } else {
      days.push({
        day: i,
        title: i % 2 === 0 ? `Cultural Heritage Excursion & Local Village Visit` : `Scenic Landscape Expedition & Photography Tour`,
        morning: `Guided cultural walking tour visiting ancient monuments and local artisan workshops.`,
        afternoon: `Farm-to-table lunch at historic heritage villa followed by scenic viewpoint visit.`,
        evening: `Sunset photography tour followed by private acoustic music dinner.`,
        highlight: `Authentic interaction with indigenous village elders and local craftsmen.`
      });
    }
  }

  return {
    title: `${durationDays}-Day ${travelStyle || 'Experiential'} Journey in ${destinationName}`,
    destination: destinationName,
    summary: `A tailor-made ${durationDays}-day ${budgetCategory || 'Mid-Range'} itinerary designed for ${adults} adults${children ? ` and ${children} kids` : ''}, focusing on authentic local experiences, comfortable eco-luxury stays, and expert native guidance.`,
    estimatedCost: isIndia ? `₹${totalCost.toLocaleString('en-IN')}` : `$${Math.round(totalCost / 85).toLocaleString()} USD`,
    stayCategory: budgetCategory === 'Luxury' ? 'Luxury Heritage Resort & Boutique Eco-Lodge' : 'Standard Handpicked Boutique Stays',
    dayWisePlan: days,
  };
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { destinationType, travelStyle, budgetCategory, durationDays, adults, children } = body;

    const itineraryData = generateFallbackItinerary(body);

    // Save itinerary to MongoDB
    await connectDB();
    const savedItinerary = await Itinerary.create({
      title: itineraryData.title,
      destination: itineraryData.destination,
      preferences: {
        destinationType,
        travelStyle,
        budgetCategory,
        durationDays: Number(durationDays) || 5,
        numberOfAdults: Number(adults) || 2,
        numberOfChildren: Number(children) || 0,
      },
      summary: itineraryData.summary,
      estimatedCost: itineraryData.estimatedCost,
      stayCategory: itineraryData.stayCategory,
      dayWisePlan: itineraryData.dayWisePlan,
    });

    return NextResponse.json({
      success: true,
      itineraryId: savedItinerary._id.toString(),
      data: savedItinerary,
    }, { status: 201 });

  } catch (error) {
    console.error('Error generating itinerary:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to generate itinerary. Please try again.',
      error: error.message,
    }, { status: 500 });
  }
}
