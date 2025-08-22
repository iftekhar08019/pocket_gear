import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import clientPromise from '../../../lib/mongodb';

export async function POST(request) {
  try {
    // Check if user is authenticated
    const session = await getServerSession();
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized - Please log in to add products' },
        { status: 401 }
      );
    }

    // Parse the request body
    const body = await request.json();
    const { name, description, price, details, image } = body;

    // Validate required fields
    if (!name || !description || !price || !details || !image) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate price is a positive number
    if (isNaN(price) || price <= 0) {
      return NextResponse.json(
        { error: 'Price must be a positive number' },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db('pocketgear');
    const collection = db.collection('products');

    // Check if product with same name already exists
    const existingProduct = await collection.findOne({ 
      name: { $regex: new RegExp(`^${name}$`, 'i') } 
    });

    if (existingProduct) {
      return NextResponse.json(
        { error: 'A product with this name already exists' },
        { status: 409 }
      );
    }

    // Create new product object
    const newProduct = {
      name: name.trim(),
      description: description.trim(),
      price: parseFloat(price),
      details: details.trim(),
      image: image.trim(),
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: session.user.email || 'unknown'
    };

    // Insert the product into the database
    const result = await collection.insertOne(newProduct);

    // Return success response with the created product
    return NextResponse.json({
      message: 'Product added successfully',
      product: {
        id: result.insertedId,
        ...newProduct
      }
    }, { status: 201 });

  } catch (error) {
    console.error('Error adding product:', error);
    return NextResponse.json(
      { error: 'Internal server error - Failed to add product' },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db('pocketgear');
    const collection = db.collection('products');

    // Get all products, sorted by creation date (newest first)
    const products = await collection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    // If no products in database, return empty array
    if (products.length === 0) {
      return NextResponse.json([]);
    }

    return NextResponse.json(products);

  } catch (error) {
    console.error('Error fetching products:', error);
    
    // If MongoDB fails, try to fall back to static data
    try {
      const fs = await import('fs/promises');
      const path = await import('path');
      const dataPath = path.join(process.cwd(), 'public', 'data.json');
      const staticData = await fs.readFile(dataPath, 'utf8');
      const staticProducts = JSON.parse(staticData);
      
      console.log('Falling back to static data due to MongoDB error');
      return NextResponse.json(staticProducts);
    } catch (fallbackError) {
      console.error('Fallback to static data also failed:', fallbackError);
      return NextResponse.json(
        { error: 'Internal server error - Failed to fetch products' },
        { status: 500 }
      );
    }
  }
}
