 "use client";

  import { Feed } from "./feed/feed";
  import { LandingAnimation } from
  "@/components/landing-animation";

  export default function HomePage() {
    return (
      <>
        <LandingAnimation />
        <div className="min-h-screen bg-gray-50 py-8         
  dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <Feed />
          </div>
        </div>
      </>
    );
  }
