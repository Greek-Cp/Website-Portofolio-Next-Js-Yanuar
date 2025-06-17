import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_FILE_PATH = path.join(process.cwd(), 'data', 'portfolio.json');

// GET - Read portfolio data
export async function GET() {
  try {
    const fileContents = fs.readFileSync(DATA_FILE_PATH, 'utf8');
    const data = JSON.parse(fileContents);
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading portfolio data:', error);
    return NextResponse.json(
      { error: 'Failed to read portfolio data' },
      { status: 500 }
    );
  }
}

// POST - Update portfolio data
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the data structure (basic validation)
    if (!body.profile || !body.projects || !body.experience) {
      return NextResponse.json(
        { error: 'Invalid data structure' },
        { status: 400 }
      );
    }
    
    // Write to file
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(body, null, 2));
    
    return NextResponse.json({ 
      success: true, 
      message: 'Portfolio data updated successfully' 
    });
  } catch (error) {
    console.error('Error saving portfolio data:', error);
    return NextResponse.json(
      { error: 'Failed to save portfolio data' },
      { status: 500 }
    );
  }
}

// PUT - Same as POST for this use case
export async function PUT(request: NextRequest) {
  return POST(request);
}