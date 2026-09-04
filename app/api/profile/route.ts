import { NextResponse } from "next/server";

let userProfile = {
  id: 1,
  name: "Arsh Jain",
  designation: "Statistical Officer",
  department: "Official Statistics",
  experience: 3,
  education: "Bachelor's Degree",
  previousTraining: [
    "Introduction to Statistics",
    "Excel for Data Analysis",
  ],
};

export async function GET() {
  return NextResponse.json({
    success: true,
    data: userProfile,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    userProfile = {
      ...userProfile,
      ...body,
    };

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
      data: userProfile,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Invalid profile data",
      },
      { status: 400 }
    );
  }
}