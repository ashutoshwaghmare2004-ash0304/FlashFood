# ⚡ FlashFood - Complete Quick Start Guide

## 🚀 Get Started (3 Steps)

### Step 1: Install
```bash
npm install
```

### Step 2: Run
```bash
npm run dev
```

### Step 3: Open
```
http://localhost:5173
```

---

## 🎮 Try the Complete Flow!

### 1️⃣ Register a New Account

1. Click **"Register"** in navbar
2. **Step 1 - Basic Info:**
   - Name: `John Doe`
   - Email: `john@example.com`
   - Password: `password123` (min 6 characters)
   - Confirm Password: `password123`
   - Phone: `9876543210`
   - Click **"Send OTP"** (OTP shown in alert)
   - Enter the OTP shown
   - Click **"Verify"**
   - Click **"Next"**

3. **Step 2 - Address & Preferences:**
   - Address: `123, Main Street`
   - Landmark: `Near Metro Station`
   - City: Select **"Mumbai"**
   - Pincode: `400001`
   - Food Preferences: Select **"Street Food"**, **"Non-Vegetarian"**, **"Desserts"**
   - Click **"Complete Registration"**

4. You'll be redirected to Login page

---

### 2️⃣ Login

1. Enter your email: `john@example.com`
2. Password: `password123` (the password you created)
3. Click **"Login"**

---

### 3️⃣ Select Your City & Enable Location

1. On home page, click **📍 City selector**
2. Choose your city (e.g., **Mumbai**)
3. Click **"Enable Location"** button
4. Allow location access when prompted
5. See location-based suggestions!

---

### 4️⃣ Browse & Order Food

1. **See Local Favorites:**
   - Top section shows **famous local dishes**
   - In Mumbai: Vada Pav, Pav Bhaji, Bombil Fry

2. **Search & Filter:**
   - Use search bar: Try "Vada Pav"
   - Click cuisine filters: "Street Food", "Seafood"

3. **Select Restaurant:**
   - Click on **"Ashok Vada Pav"** (Mumbai's famous!)
   - See the menu

4. **Add to Cart:**
   - Click **"Add to Cart"** on Vada Pav (₹25)
   - See cart count update in navbar

---

### 5️⃣ Checkout

1. Click **🛒 Cart icon** in navbar
2. Review your items
3. Adjust quantity with +/- buttons
4. See bill breakdown:
   - Item Total
   - Delivery Fee: ₹40
   - Taxes: 5%
5. Click **"Proceed to Checkout"**
6. Review delivery address
7. Click **"Place Order"**

---

### 6️⃣ Track Your Order (Live Tracking!)

1. Go to **"Orders"** in navbar
2. See your order with status **"Confirmed"**
3. Click **"🗺️ Track"**

**Live Tracking Features:**
- ✅ Order progress (4 steps)
- ✅ Current status highlighted
- ✅ Delivery partner details
- ✅ Live location (simulated)
- ✅ **Fast delivery: 25 minutes!**

### 7️⃣ Cancel Order (NEW!)

**From Orders Page:**
1. See your active order
2. Click **"❌ Cancel"** button
3. Confirm cancellation
4. Order cancelled! Refund processed

**From Track Order Page:**
1. Scroll to "Cancel Order" section
2. Click **"❌ Cancel Order"**
3. Confirm in popup
4. Redirected to orders page
5. See "Cancelled" status

**Note:** Can only cancel before delivery!

---

## 🌆 Try Different Cities - ALL Have EVERYTHING!

### Every City Has Complete Variety:

#### 🏙️ Bangalore
**Has Everything:** Pizza, Burgers, Chinese, Biryani, Mexican, Sushi, Coffee, etc.
**Local Famous:** Masala Dosa from Saravana Bhavan

Try:
- 🍕 Domino's Pizza
- 🍔 McDonald's Burger
- 🍛 Paradise Biryani
- ☕ Starbucks Coffee

#### 🌊 Mumbai
**Has Everything:** Pizza, Burgers, Chinese, Biryani, Mexican, Sushi, Coffee, etc.
**Local Famous:** Vada Pav (if added as special item)

Try:
- 🍕 Pizza Hut
- 🍗 KFC Chicken
- 🥡 Mainland China
- 🍦 Baskin Robbins

#### 🕌 Hyderabad
**Has Everything:** Pizza, Burgers, Chinese, Biryani, Mexican, Sushi, Coffee, etc.
**Local Famous:** Hyderabadi Biryani from Paradise

Try:
- 🍛 Biryani Blues
- 🌮 Taco Bell
- 🍣 Sushi Bar
- 🥗 Salad Days

#### 🏛️ Delhi
**Has Everything:** Pizza, Burgers, Chinese, Biryani, Mexican, Sushi, Coffee, etc.
**Local Famous:** North Indian from Punjabi Rasoi

Try:
- 🍔 Burger King
- 🥟 Wow! Momo
- 🍰 Theobroma Bakery
- ☕ Cafe Coffee Day

#### 🎓 Pune
**Has Everything:** Pizza, Burgers, Chinese, Biryani, Mexican, Sushi, Coffee, etc.

Try ALL cuisines available!

#### 🎨 Ahmedabad
**Has Everything:** Pizza, Burgers, Chinese, Biryani, Mexican, Sushi, Coffee, etc.

Try ALL cuisines available!

**🎉 Every city is a food paradise with COMPLETE variety!**

---

## ✨ Features to Test

### 📍 Location Features
- ✅ Enable location access
- ✅ See nearby suggestions
- ✅ City-specific famous dishes
- ✅ Local favorites section

### 📝 Registration
- ✅ Multi-step form
- ✅ OTP verification (simulated)
- ✅ Address collection
- ✅ Food preferences

### 🔑 Authentication
- ✅ Separate login page
- ✅ Separate register page
- ✅ Session persistence

### 🍕 Ordering
- ✅ Browse 16 restaurants
- ✅ 35+ menu items
- ✅ Add to cart
- ✅ Quantity management
- ✅ Bill calculation

### 🗺️ Tracking
- ✅ Live order status
- ✅ Delivery partner info
- ✅ Location tracking
- ✅ ETA display

---

## 🎯 Quick Tests

### Test 1: OTP Verification
```
Register → Enter phone → Send OTP
→ Check alert for OTP → Enter it → Verify
✅ Success!
```

### Test 2: Location Access
```
Home → Enable Location button
→ Allow location → See suggestions
✅ Location-based content!
```

### Test 3: City Change
```
Home → Click city selector → Choose city
→ See different restaurants
✅ City-specific restaurants!
```

### Test 4: Live Tracking
```
Place order → Go to Orders
→ Track Order → See live status
✅ Real-time tracking!
```

### Test 5: Local Favorites
```
Home → See "Local Favorites" section
→ Shows famous dishes from your city
✅ City-based suggestions!
```

---

## 📊 What's Available - EVERYTHING in EVERY City!

### 🌆 Cities (6)
- Bangalore, Mumbai, Pune, Delhi, Hyderabad, Ahmedabad
- **All cities have ALL types of restaurants!**

### 🍴 Restaurants (150+)
**25+ Restaurant Chains in EVERY City:**
- **Pizza:** Domino's, Pizza Hut, La Pinoz
- **Burgers:** McDonald's, Burger King, Subway
- **Chicken:** KFC
- **Biryani:** Paradise, Biryani Blues
- **Chinese:** Mainland China, Wow! Momo
- **South Indian:** Saravana Bhavan, Sangeetha
- **North Indian:** Punjabi Rasoi, Rajdhani Thali
- **Mexican:** Taco Bell
- **Cafe:** Starbucks, Cafe Coffee Day
- **Desserts:** Baskin Robbins, NIC, Theobroma
- **Japanese:** Sushi Bar
- **Seafood:** Fish & More
- **Grills:** Barbeque Nation
- **Street Food:** Chaat Corner, Rollsking
- **Healthy:** Salad Days
- **Continental:** The Continental
- And more!

### 🍕 Menu Items (400+)
**Every City Has:**
- Pizza (Margherita, Pepperoni, Pasta)
- Burgers (Veg, Chicken, Fries)
- Chicken (Fried, Grilled, Zinger)
- Biryani (Chicken, Mutton, Veg)
- Chinese (Noodles, Fried Rice, Manchurian)
- South Indian (Dosa, Idli, Coffee)
- North Indian (Thali, Curry, Tandoor)
- Mexican (Tacos, Burritos)
- Japanese (Sushi, Rolls)
- Desserts (Ice Cream, Cakes)
- Coffee & Beverages
- And much more!

---

## 🐛 Troubleshooting

### OTP not received?
- It's shown in the alert popup!
- Demo mode displays OTP immediately
- Enter the 6-digit code shown

### Location not working?
- Allow location access in browser
- Check browser permissions
- Works best on HTTPS

### Cart empty after city change?
- This is expected!
- Cart clears when you change city
- Order from one city at a time

### Can't track order?
- Make sure you placed an order
- Click "Track Order" from Orders page
- Order ID must match

---

## 💡 Pro Tips

### Tip 1: Try Each City
Each city has unique restaurants and dishes!

### Tip 2: Enable Location
Get better restaurant suggestions

### Tip 3: Check Local Favorites
See what's famous in each city

### Tip 4: Track Orders
Use live tracking to see delivery status

### Tip 5: Reorder
Quick reorder from order history

---

## 🎉 You're All Set!

Now you have:
- ✅ Multi-city food delivery
- ✅ Location-based suggestions
- ✅ Live order tracking
- ✅ 16 restaurants
- ✅ 35+ dishes
- ✅ Complete registration flow

**Start Ordering Delicious Food! 🍔🍕🍜**

---

For detailed documentation, see [README.md](README.md)
