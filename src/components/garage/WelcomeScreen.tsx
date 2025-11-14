"use client";

import { useAuth } from "@/firebase";
import { initiateAnonymousSignIn } from "@/firebase/non-blocking-login";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Wrench, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { FirebaseError } from "firebase/app";

export function WelcomeScreen() {
    const auth = useAuth();
    const { toast } = useToast();

    const handleLogin = async () => {
        if (!auth) {
            toast({
                variant: 'destructive',
                title: "Error",
                description: "Firebase is not ready yet. Please wait a moment and try again."
            })
            return;
        };

        try {
            // We can await this here because it's a user interaction
            await initiateAnonymousSignIn(auth);
            toast({
                title: "Signed In",
                description: "You've been signed in anonymously.",
            })
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
            <Card className="w-full max-w-md text-center">
                <CardHeader>
                    <div className="mx-auto bg-accent/20 text-accent rounded-full p-3 w-fit">
                        <Wrench className="h-10 w-10" />
                    </div>
                    <CardTitle className="mt-4 font-headline text-2xl">Welcome to Interval</CardTitle>
                    <CardDescription>
                        A proactive health and maintenance tracker for the modern car enthusiast.
                        Sign in anonymously to begin building your garage.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button onClick={handleLogin} size="lg" className="w-full shadow-sm hover:shadow-glow-accent transition-shadow duration-300">
                        <User className="mr-2 h-4 w-4" />
                        Sign In Anonymously
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}
