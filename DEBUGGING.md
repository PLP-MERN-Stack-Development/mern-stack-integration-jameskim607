# Registration Debugging Guide

If registration is not working, follow these steps:

## 1. Verify Server is Running
- Open a terminal and run: `http://localhost:5000/health`
- You should see: `{"status":"ok"}`
- If not, start the server: `cd server && npm run dev`

## 2. Check Browser Console
1. Open your browser's Developer Tools (F12)
2. Go to the **Console** tab
3. Try to register and look for console logs:
   - **From client:** Look for "Sending register request:" logs
   - This will show what data is being sent

## 3. Check Server Logs
1. Look at the server terminal (where you ran `npm run dev`)
2. You should see logs like:
   - "Register attempt for: [email]"
   - "User created: [id]" (if successful)
   - Or error messages if something failed

## 4. Check Network Tab (in Browser DevTools)
1. Open DevTools → **Network** tab
2. Try to register
3. Look for the `register` POST request
4. Click on it and check:
   - **Request** tab: Verify name, email, password are being sent
   - **Response** tab: See what the server is returning

## 5. Common Issues & Solutions

### Issue: "User already exists"
- **Solution:** You've already registered with that email. Use a different email or delete the user from MongoDB.

### Issue: "Validation errors" 
- **Solution:** Check that:
  - Name is not empty
  - Email is a valid email format (contains @)
  - Password is at least 6 characters

### Issue: Request fails with 404
- **Solution:** The API endpoint might be wrong. Check that:
  - Server is running on port 5000
  - Client is trying to reach `http://localhost:5000/api/auth/register`
  - Check the `.env` file in the client folder (should have VITE_API_URL or default to http://localhost:5000/api)

### Issue: CORS error
- **Solution:** Server CORS is enabled, but verify:
  - Server is running (check terminal)
  - No firewall is blocking the connection

## 6. Manual Test with curl (PowerShell)

Test the register endpoint manually:

```powershell
$body = @{
    name = "Test User"
    email = "test@example.com"
    password = "password123"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:5000/api/auth/register" `
  -Method POST `
  -Body $body `
  -ContentType "application/json"
```

Expected response should include a `token` and `user` object.

## 7. Check MongoDB Connection
1. Make sure MongoDB is running locally or your Atlas cluster is accessible
2. Check the `.env` file has the correct `MONGODB_URI`
3. If using local MongoDB, run: `mongod` in a separate terminal

## Still Having Issues?
- Check the error message displayed on the registration page (now shows actual errors instead of generic alerts)
- Check both the **Browser Console** and **Server Terminal** logs
- Ensure both servers are running:
  - Server: `cd server && npm run dev` (port 5000)
  - Client: `cd client && npm run dev` (port 5173)
