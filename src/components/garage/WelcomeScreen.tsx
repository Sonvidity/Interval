
"use client";

import { useAuth } from "@/firebase";
import { signInAnonymously } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Wrench, User, LogIn } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { FirebaseError } from "firebase/app";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function WelcomeScreen() {
    const auth = useAuth();
    const { toast } = useToast();
    const router = useRouter();

    const handleAnonymousLogin = async () => {
        if (!auth) {
            toast({
                variant: 'destructive',
                title: "Error",
                description: "Firebase is not ready yet. Please wait a moment and try again."
            })
            return;
        };

        try {
            await signInAnonymously(auth);
            toast({
                title: "Signed In",
                description: "You've been signed in anonymously. Create an account to save your data.",
            })
            // The onAuthStateChanged listener in useUser will handle the redirect indirectly
        } catch (e) {
            const err = e as FirebaseError;
            let description = "An unknown error occurred while signing in.";
            if (err.code === 'auth/network-request-failed') {
                description = "Please check your internet connection and try again.";
            } else if (err.code === 'auth/operation-not-allowed') {
                description = "Anonymous sign-in is not enabled for this app. Please contact support.";
            }
            toast({
                variant: "destructive",
                title: "Sign-In Failed",
                description: description,
            })
        }
    }

    return (
        <div className="flex items-center justify-center h-full min-h-[60vh]">
            <Card className="w-full max-w-lg text-center">
                <CardHeader>
                    <div className="mx-auto bg-accent/20 text-accent rounded-full p-3 w-fit">
                        <Wrench className="h-10 w-10" />
                    </div>
                    <CardTitle className="mt-4 font-headline text-2xl">Welcome to Interval</CardTitle>
                    <CardDescription>
                        A proactive health and maintenance tracker for the modern car enthusiast.
                        Sign in or create an account to get started.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                     <Link href="/login" passHref>
                        <Button size="lg" className="w-full shadow-sm hover:shadow-glow-accent transition-shadow duration-300">
                            <LogIn className="mr-2 h-4 w-4" />
                            Sign In or Create Account
                        </Button>
                    </Link>
                    <Button onClick={handleAnonymousLogin} size="lg" variant="secondary" className="w-full">
                        <User className="mr-2 h-4 w-4" />
                        Try Anonymously
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}
