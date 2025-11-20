# Shopping Cart API

RESTful API for managing shopping cart using Express.js, Prisma, and MySQL.

## Setup Instructions

1. **Configure Database**:
   - Make sure MySQL is running on your system
   - Create a database named `cart_db`
   - Update the `DATABASE_URL` in `.env` file with your MySQL credentials
   - Example: `DATABASE_URL="mysql://root:yourpassword@localhost:3306/cart_db"`

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Test Database Connection**:
   ```bash
   npm run setup
   ```

4. **Run Database Migration**:
   ```bash
   npx prisma migrate dev --name init
   ```

5. **Start the Server**:
   ```bash
   npm start
   ```

## Troubleshooting

If you get "Internal Server Error":
1. Check if MySQL is running
2. Verify database credentials in `.env`
3. Run `npm run setup` to test connection
4. Check server logs for specific error messages

## API Endpoints

All endpoints require `apiauthkey` header with value: `8a60348b-d4a4-564a-9b45-aab518adb7f4`

- **POST** `/api/cart/addProduct` - Create cart entry
- **GET** `/api/cart/getById/:id` - Get cart entry by ID
- **PATCH** `/api/cart/patch/:id` - Update cart entry
- **DELETE** `/api/cart/removeProduct/:id` - Delete cart entry

## Testing

```bash
npm test
```