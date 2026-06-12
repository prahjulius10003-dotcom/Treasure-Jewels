# Treasure Jewels Ghana - Online Bag Shop

## Setup Instructions

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment
Copy `.env.example` to `.env` and fill in your values:
- Get Paystack keys at https://dashboard.paystack.com
- Set a strong ADMIN_PASSWORD

### 3. Run the server
```bash
npm run dev   # development (auto-restarts)
npm start     # production
```

### 4. Open in browser
- Store: http://localhost:3000
- Admin: http://localhost:3000/admin

## Adding Product Images
Upload bag images to `public/images/` and use the filename when adding products in the admin panel.
