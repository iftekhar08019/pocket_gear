import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';

export async function GET() {
  try {
    // Test MongoDB connection
    const client = await clientPromise;
    const db = client.db('pocketgear');
    
    // Test basic operations
    const collections = await db.listCollections().toArray();
    const productCount = await db.collection('products').countDocuments();
    
    return NextResponse.json({
      status: 'success',
      message: 'MongoDB connection successful',
      database: 'pocketgear',
      collections: collections.map(col => col.name),
      productCount: productCount,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('MongoDB test error:', error);
    return NextResponse.json({
      status: 'error',
      message: 'MongoDB connection failed',
      error: error.message
    }, { status: 500 });
  }
}
