# Test Registration Endpoint

Run this in PowerShell to test if the registration endpoint works:

```powershell
# Test 1: Check if server is running
Invoke-WebRequest -Uri "http://localhost:5000/health" -Method GET

# Test 2: Register a new user
$body = @{
    name = "John Doe"
    email = "john@example.com"
    password = "password123"
} | ConvertTo-Json

$response = Invoke-WebRequest -Uri "http://localhost:5000/api/auth/register" `
  -Method POST `
  -Body $body `
  -ContentType "application/json"

Write-Host "Response Status: $($response.StatusCode)"
Write-Host "Response Body:"
$response.Content | ConvertFrom-Json | ConvertTo-Json
```

Expected Success Response:
```json
{
  "token": "eyJhbGc...",
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

If you get an error:
1. Copy the full error message
2. Check it against the debugging guide in DEBUGGING.md
3. Look at the server terminal for more details
