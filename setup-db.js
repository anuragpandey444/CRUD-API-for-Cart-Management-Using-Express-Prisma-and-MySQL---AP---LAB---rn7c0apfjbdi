const { PrismaClient } = require('@prisma/client');

async function setupDatabase() {
  const prisma = new PrismaClient();
  
  try {
    // Test connection
    await prisma.$connect();
    console.log('✅ Database connected successfully');
    
    // Test if Cart table exists by trying to count records
    const count = await prisma.cart.count();
    console.log(`✅ Cart table exists with ${count} records`);
    
  } catch (error) {
    console.error('❌ Database setup error:', error.message);
    console.log('\n📝 Setup Instructions:');
    console.log('1. Make sure MySQL is running');
    console.log('2. Update DATABASE_URL in .env file with correct credentials');
    console.log('3. Run: npx prisma migrate dev --name init');
    console.log('4. Run: npm start');
  } finally {
    await prisma.$disconnect();
  }
}

setupDatabase();