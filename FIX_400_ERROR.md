# Fixed: 400 Bad Request Error in Registration

## What was the issue?
You were getting a "Request failed with status code 400" error, which means your registration data wasn't passing validation.

## What we fixed:
✅ **Client-side validation** - The form now checks before sending:
  - Name cannot be empty
  - Email must be valid (contain @)
  - Password must be at least 6 characters

✅ **Server-side validation** - Better error messages that tell you exactly what's wrong:
  - "Name is required"
  - "Valid email is required"
  - "Password must be at least 6 characters"
  - "Email already registered"

✅ **Client error display** - Errors now show clearly on the registration page

## Common Registration Errors & Fixes:

### "Name is required"
**Fix:** Enter a name (cannot be empty)
```
✓ Good: "John Doe", "Jane Smith", "Test User"
✗ Bad: "" (empty)
```

### "Valid email is required"
**Fix:** Use a proper email format with @ symbol
```
✓ Good: "john@example.com", "user@gmail.com", "test@test.co"
✗ Bad: "john", "john@", "@example.com"
```

### "Password must be at least 6 characters"
**Fix:** Use a password with 6 or more characters
```
✓ Good: "password123", "mySecurePass", "abc@123"
✗ Bad: "pass", "123", "abcde"
```

### "Email already registered"
**Fix:** Use a different email address
- If you want to test multiple accounts, add a number: "test1@example.com", "test2@example.com"
- Or use: "yourname+1@gmail.com", "yourname+2@gmail.com"

## How to Register Now:

1. Go to http://localhost:5173/register
2. Fill in the form with:
   - **Name:** Any name (e.g., "John Doe")
   - **Email:** Valid email (e.g., "john@example.com") - must be unique!
   - **Password:** At least 6 characters (e.g., "password123")
3. Click Register
4. If successful, you'll be redirected to the home page
5. If there's an error, you'll see a clear message telling you what's wrong

## Testing on Command Line:

Valid registration:
```powershell
$email = "testuser$(Get-Random)@example.com"
$body = "{`"name`":`"Test User`",`"email`":`"$email`",`"password`":`"password123`"}"
Invoke-WebRequest -Uri "http://localhost:5000/api/auth/register" `
  -Method POST `
  -Headers @{"Content-Type"="application/json"} `
  -Body $body
```

Invalid registration (will show validation errors):
```powershell
$body = '{"name":"","email":"invalid","password":"short"}'
try {
  Invoke-WebRequest -Uri "http://localhost:5000/api/auth/register" `
    -Method POST `
    -Headers @{"Content-Type"="application/json"} `
    -Body $body
} catch {
  Write-Host $_.ErrorDetails.Message
}
```

## If You Still Get 400 Error:

1. **Check the error message** shown on the registration page
2. **Make sure all fields are filled:**
   - Name is not empty
   - Email is valid format
   - Password is 6+ characters
3. **Use a unique email** - you can't register the same email twice
4. **Check Browser Console** (F12) for more details
5. **Check Server Terminal** for logs

You should now be able to register successfully! 🎉
