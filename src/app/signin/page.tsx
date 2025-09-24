
"use client";

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
// Remove Lucide icons, we'll use PNG images instead
import Link from 'next/link';
import Image from 'next/image';
import { usePrivy } from '@privy-io/react-auth';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import {useLoginWithOAuth } from '@privy-io/react-auth';
export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const { login, authenticated, user, linkGoogle } = usePrivy();
  const {initOAuth} = useLoginWithOAuth();

  const handleOpenResetDialog = () => {
    setResetEmail(email); // Pre-fill with current email
    setIsResetDialogOpen(true);
    setResetSuccess(false);
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail.trim()) {
      return;
    }

    setResetLoading(true);
    try {
      // Privy handles password reset through their modal
      await login();
      setResetSuccess(true);
      toast({
        title: 'Password Reset',
        description: 'Please use the Privy modal to reset your password.',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setResetLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login();
      toast({ 
        title: 'Welcome back!', 
        description: 'You have been signed in successfully.' 
      });
      router.push('/');
    } catch (error: any) {
      toast({
        title: 'Sign In Failed',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive',
      });
    }
  };
  
  const handleGoogleSignIn = async () => {
    try {
      // await linkGoogle();
      await login({loginMethods: ['google']});
      // await initOAuth({provider: 'google'});

      toast({ title: 'Success', description: 'Signed in with Google successfully!' });
      // router.push('/');
    } catch (error: any) {
      console.error('Google Sign-in Error:', error);
      toast({
        title: 'Error signing in with Google',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleGithubSignIn = async () => {
    try {
      await login({loginMethods: ['github']});
      // await initOAuth({provider: 'github'});
      toast({ title: 'Success', description: 'Signed in with GitHub successfully!' });
      // router.push('/');
    } catch (error: any) {
      console.error('GitHub Sign-in Error:', error);
      toast({
        title: 'Error signing in with GitHub',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    if (user) {
      console.log('user', user);
      router.push('/');
    }
  }, [user]);

  return (
    <div className="flex flex-1 items-center justify-center p-4 h-[-webkit-fill-available]" style={{ backgroundColor: '#f8f8f8' }}>
      {/* Background Logo behind the form */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <Image 
          src="/assets/images/logo_black.png" 
          alt="Gatewayz Background" 
          width={750} 
          height={750} 
          className="object-contain"
        />
            </div>
            
      <div className="w-full max-w-md relative z-10">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg p-4 space-y-5 w-[460px]">
          {/* Header */}
          <div className="text-center space-y-3">
            <h1 className="text-[32px] font-bold font-inter" style={{ fontWeight: 700 }}>Sign In With Email</h1>
            </div>

          {/* Email/Password Form */}
            <form className="space-y-4" onSubmit={handleSignIn}>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    autoComplete="email" 
                    required 
                  placeholder="email@test.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                />
                <Image 
                  src="/assets/icons/mail.png" 
                  alt="Email" 
                  width={16} 
                  height={16} 
                  className="absolute left-3 top-1/2 -translate-y-1/2"
                />
                </div>
              </div>

            <div className="space-y-2">
                 <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                 <Dialog open={isResetDialogOpen} onOpenChange={setIsResetDialogOpen}>
                   <DialogTrigger asChild>
                     <button 
                       type="button"
                       onClick={handleOpenResetDialog}
                       className="text-sm text-primary hover:underline"
                     >
                       Forgot Password?
                     </button>
                   </DialogTrigger>
                   <DialogContent className="sm:max-w-[425px] w-[425px] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                     <DialogHeader>
                       <DialogTitle>Reset Password</DialogTitle>
                       <DialogDescription>
                         Enter your email address and we'll send you a link to reset your password.
                       </DialogDescription>
                     </DialogHeader>
                     
                     <div className="min-h-[200px] flex flex-col justify-between space-y-4">
                       {resetSuccess ? (
                         <>
                           <Alert className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
                             <AlertDescription className="text-green-800 dark:text-green-200">
                               <div className="space-y-2">
                                 <p className="font-medium">Reset link sent successfully!</p>
                                 <p className="text-sm">We've sent password reset instructions to <strong>{resetEmail}</strong>. Please check your inbox and follow the link to create a new password.</p>
                                 <p className="text-xs opacity-75">Don't see the email? Check your spam folder or try again in a few minutes.</p>
                               </div>
                             </AlertDescription>
                           </Alert>
                           <Button 
                             onClick={() => setIsResetDialogOpen(false)}
                             className="w-full !bg-black hover:!bg-gray-800 !text-white"
                           >
                             Close
                           </Button>
                         </>
                       ) : (
                         <>
                           <form onSubmit={handlePasswordReset} className="space-y-4">
                             <div className="space-y-2">
                               <Label htmlFor="reset-email">Email Address</Label>
                               <Input
                                 id="reset-email"
                                 type="email"
                                 placeholder="Enter your email address"
                                 value={resetEmail}
                                 onChange={(e) => setResetEmail(e.target.value)}
                                 required
                               />
                             </div>
                           </form>
                           
                           <div className="flex gap-3">
                             <Button 
                               type="button" 
                               variant="outline" 
                               onClick={() => setIsResetDialogOpen(false)}
                               className="flex-1"
                             >
                               Cancel
                             </Button>
                             <Button 
                               type="submit" 
                               disabled={resetLoading || !resetEmail.trim()}
                               className="flex-1 !bg-black hover:!bg-gray-800 !text-white"
                               onClick={handlePasswordReset}
                             >
                               {resetLoading ? 'Sending...' : 'Send Reset Email'}
                             </Button>
                           </div>
                         </>
                       )}
                     </div>
                   </DialogContent>
                 </Dialog>
                 </div>
              <div className="relative">
                  <Input 
                    id="password" 
                    name="password" 
                    type={showPassword ? "text" : "password"} 
                    autoComplete="current-password" 
                    required 
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                />
                <Image 
                  src="/assets/icons/password.png" 
                  alt="Password" 
                  width={16} 
                  height={16} 
                  className="absolute left-3 top-1/2 -translate-y-1/2"
                />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                  {showPassword ? 
                    <Image src="/assets/icons/eye-off.png" alt="Hide password" width={16} height={16} /> : 
                    <Image src="/assets/icons/eye.png" alt="Show password" width={16} height={16} />
                  }
                  </button>
                </div>
              </div>

            <Button type="submit" className="w-full !bg-black hover:!bg-gray-800 !text-white border-none">
              Sign In
                </Button>

            </form>

          {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-sm">
              <span className="bg-white dark:bg-gray-800 px-2 text-muted-foreground">Or Sign In With</span>
              </div>
            </div>

          {/* Social Login Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <Button 
              variant="outline" 
              onClick={handleGithubSignIn} 
              className="w-full !bg-black hover:!bg-gray-800 !text-white border-none"
            >
              <Image 
                src="/assets/icons/git.png" 
                alt="GitHub" 
                width={16} 
                height={16} 
                className="mr-2"
              />
              GitHub
            </Button>
            <Button 
              variant="outline" 
              onClick={handleGoogleSignIn} 
              className="w-full !bg-black hover:!bg-gray-800 !text-white border-none"
            >
              <Image 
                src="/assets/icons/google.png" 
                alt="Google" 
                width={16} 
                height={16} 
                className="mr-2"
              />
              Google
                </Button>
            </div>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-primary hover:underline font-medium">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
