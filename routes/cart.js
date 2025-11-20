const express = require('express');
const { PrismaClient } = require('@prisma/client');
const authMiddleware = require('../middleware/auth');

const router = express.Router();
const prisma = new PrismaClient();

// Apply auth middleware to all routes
router.use(authMiddleware);

// Create a new cart entry
router.post('/addProduct', async (req, res) => {
  const { userId, productId, count } = req.body;
  
  if (!userId || !productId || !count) {
    return res.status(404).json({ error: "All fields required" });
  }
  
  try {
    const cart = await prisma.cart.create({
      data: { userId, productId, count }
    });
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Retrieve cart entry by ID
router.get('/getById/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const cart = await prisma.cart.findUnique({
      where: { cartId: parseInt(id) }
    });
    
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }
    
    res.status(200).json(cart);
  } catch (error) {
    res.status(404).json({ error: "Cart not found" });
  }
});

// Partially update a cart entry
router.patch('/patch/:id', async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  
  try {
    const cart = await prisma.cart.update({
      where: { cartId: parseInt(id) },
      data: updateData
    });
    res.status(200).json(cart);
  } catch (error) {
    res.status(404).json({ error: "Cart not found" });
  }
});

// Delete a cart entry
router.delete('/removeProduct/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    await prisma.cart.delete({
      where: { cartId: parseInt(id) }
    });
    res.status(200).json({ message: "Cart deleted successfully" });
  } catch (error) {
    res.status(404).json({ error: "Cart not found" });
  }
});

module.exports = router;