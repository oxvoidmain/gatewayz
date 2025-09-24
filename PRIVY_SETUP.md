# Privy Authentication Setup Guide

This guide will help you set up Privy authentication for your Next.js application with Google, GitHub, and email/password login.

## 1. Create a Privy Account

1. Go to [Privy Dashboard](https://dashboard.privy.io/)
2. Sign up for a free account
3. Create a new app

## 2. Configure Your Privy App

### Step 1: Basic App Configuration
1. In your Privy dashboard, go to your app settings
2. Set your app name and description
3. Add your domain (for development: `localhost:3000`)

### Step 2: Configure Login Methods
1. Go to **Authentication** → **Login Methods**
2. Enable the following methods:
   - ✅ **Email**
   - ✅ **Google**
   - ✅ **GitHub**

### Step 3: Configure OAuth Providers

#### Google OAuth Setup:
1. Go to **Authentication** → **OAuth Providers** → **Google**
2. Click **Configure Google**
3. You'll need to set up Google OAuth in Google Cloud Console:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Add authorized redirect URIs:
     - `https://auth.privy.io/api/v1/oauth/google/callback`
   - Copy your Client ID and Client Secret to Privy

#### GitHub OAuth Setup:
1. Go to **Authentication** → **OAuth Providers** → **GitHub**
2. Click **Configure GitHub**
3. You'll need to set up GitHub OAuth:
   - Go to [GitHub Developer Settings](https://github.com/settings/developers)
   - Create a new OAuth App
   - Set Authorization callback URL to:
     - `https://auth.privy.io/api/v1/oauth/github/callback`
   - Copy your Client ID and Client Secret to Privy

### Step 4: Configure Embedded Wallets (Optional)
Since you mentioned you don't want wallet operations currently:
1. Go to **Wallets** → **Embedded Wallets**
2. Set **Create on Login** to **Off**

## 3. Environment Variables

Create a `.env.local` file in your project root:

```env
# Privy Configuration
NEXT_PUBLIC_PRIVY_APP_ID=your-privy-app-id

# Google AI API Key (for Genkit)
GOOGLE_AI_API_KEY=your-google-ai-api-key
```

To get your Privy App ID:
1. Go to your Privy dashboard
2. Navigate to **Settings** → **General**
3. Copy your **App ID**

## 4. Testing the Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:3000/signin`

3. Click any of the authentication buttons:
   - **Sign In** button (email/password)
   - **Google** button
   - **GitHub** button

4. Complete the authentication flow

## 5. How It Works

### Authentication Flow:
1. User clicks any authentication button
2. Privy modal opens with configured login methods
3. User completes authentication (email/password, Google, or GitHub)
4. Privy handles the OAuth flow and user creation
5. User is automatically signed in to your app

### User Data:
Privy provides user data in this format:
```typescript
{
  id: string;
  email?: {
    address: string;
    verified: boolean;
  };
  google?: {
    email: string;
    name: string;
    picture: string;
  };
  github?: {
    email: string;
    name: string;
    picture: string;
  };
}
```

## 6. Production Deployment

### Update Environment Variables:
For production, update your environment variables:
- `NEXT_PUBLIC_PRIVY_APP_ID`: Your production Privy App ID

### Update Privy Dashboard:
1. Add your production domain to authorized domains
2. Update OAuth redirect URIs for production
3. Configure production OAuth apps in Google/GitHub

## 7. Troubleshooting

### Common Issues:

1. **"Invalid App ID" error**
   - Verify your `NEXT_PUBLIC_PRIVY_APP_ID` is correct
   - Check that the app ID matches your Privy dashboard

2. **OAuth provider not working**
   - Ensure OAuth providers are properly configured in Privy dashboard
   - Verify redirect URIs are correct in Google/GitHub OAuth settings

3. **Modal not opening**
   - Check browser console for errors
   - Ensure Privy provider is properly wrapped around your app

4. **User data not available**
   - Check that user is authenticated: `const { authenticated } = usePrivy()`
   - Verify user object structure matches expected format

### Debug Mode:
To enable debug mode, add this to your Privy config:
```typescript
config: {
  // ... other config
  debug: true,
}
```

## 8. Security Considerations

1. **Never commit your `.env.local` file** to version control
2. **Use HTTPS in production**
3. **Keep your Privy App ID secure**
4. **Regularly rotate OAuth credentials**
5. **Monitor authentication logs in Privy dashboard**

## 9. Next Steps

Once Privy authentication is working, you can:
- Add more OAuth providers (Discord, Twitter, etc.)
- Implement user profile management
- Add role-based access control
- Set up webhooks for user events
- Enable embedded wallets when needed

## 10. Support

- [Privy Documentation](https://docs.privy.io/)
- [Privy Discord](https://discord.gg/privy)
- [Privy Support](https://support.privy.io/)

