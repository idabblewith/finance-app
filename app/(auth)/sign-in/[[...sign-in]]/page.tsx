import { SignIn, ClerkLoading, ClerkLoaded } from "@clerk/nextjs";
import React from "react";
import Image from "next/image";

import { Loader2 } from "lucide-react";

const SignInPage = () => {
	return (
		<div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
			<div className="h-full lg:flex flex flex-col items-center justify-center px-4">
				<div className="text-center space-y-4 pt-16">
					<h1 className="font-bold text-3xl text-[#2E2A47]">
						Welcome Back!
					</h1>
					<p className="text-base text-[#7E8CA0]">
						Login or create account
					</p>
				</div>
				<div className="flex items-center justify-center mt-8">
					<ClerkLoaded>
						<SignIn path="/sign-in" routing="path" />
					</ClerkLoaded>
					<ClerkLoading>
						<Loader2
							size={48}
							className="animate-spin text-muted-foreground"
						/>
					</ClerkLoading>
				</div>
			</div>
			<div className="h-full bg-blue-600 hidden lg:flex items-center justify-center">
				<Image src="/logo.svg" height={100} width={100} alt="Logo" />
			</div>
		</div>
	);
};

export default SignInPage;
