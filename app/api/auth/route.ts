import { MongoClient } from 'mongodb'
import { NextResponse } from 'next/server'

// Encode the password part of the URL
const password = encodeURIComponent('Vivesh@0411')
const MONGODB_URI = `mongodb+srv://razor1211:${password}@cluster0.9u6sh1y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

export async function POST(request: Request) {
  try {
    const { type, email, password, name } = await request.json()
    const client = await MongoClient.connect(MONGODB_URI)
    const db = client.db('zenzone')

    if (type === 'login') {
      const user = await db.collection('users').findOne({ email })
      await client.close()

      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 })
      }

      if (user.password !== password) {
        return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
      }

      return NextResponse.json({
        id: user._id,
        name: user.name,
        email: user.email
      })
    }

    if (type === 'signup') {
      const existingUser = await db.collection('users').findOne({ email })
      
      if (existingUser) {
        await client.close()
        return NextResponse.json({ error: 'User already exists' }, { status: 409 })
      }

      const result = await db.collection('users').insertOne({
        name,
        email,
        password,
        createdAt: new Date()
      })

      await client.close()
      return NextResponse.json({
        id: result.insertedId,
        name,
        email
      })
    }

    return NextResponse.json({ error: 'Invalid request type' }, { status: 400 })
  } catch (error) {
    console.error('Auth error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}