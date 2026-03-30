import { databases, users } from "@/models/server/config";
import { db, questionCollection, answerCollection, voteCollection } from "@/models/name";
import { Query } from "node-appwrite";
import React from "react";
import Link from "next/link";
import { BackgroundBeams } from "@/components/ui/background-beams";
import ShimmerButton from "@/components/magicui/shimmer-button";
import { WobbleCard } from "@/components/ui/wobble-card";
import { IconMessage, IconWorldQuestion, IconTrophy } from "@tabler/icons-react";

export default async function Home() {
    const stats = await Promise.all([
        databases.listDocuments(db, questionCollection, [Query.limit(1)]),
        databases.listDocuments(db, answerCollection, [Query.limit(1)]),
        databases.listDocuments(db, voteCollection, [Query.limit(1)]),
        users.list([Query.limit(1)]),
    ]);

    const data = [
        { label: "Questions asked", value: stats[0].total },
        { label: "Answers provided", value: stats[1].total },
        { label: "Votes cast", value: stats[2].total },
        { label: "Community members", value: stats[3].total },
    ];

    return (
        <main className="flex min-h-screen flex-col items-center justify-between">
            {/* Hero Section */}
            <div className="relative flex h-[80vh] w-full flex-col items-center justify-center overflow-hidden bg-black antialiased">
                <div className="z-10 mx-auto max-w-4xl p-4 text-center">
                    <h1 className="relative z-10 bg-gradient-to-b from-neutral-200 to-neutral-600 bg-clip-text text-center font-sans text-5xl font-bold text-transparent md:text-7xl">
                        Ask, Answer, Learn.
                    </h1>
                    <p className="mx-auto my-4 max-w-lg text-center text-base text-neutral-400 md:text-xl">
                        Join our community of developers to share knowledge, solve problems, and build the future of software together.
                    </p>
                    <div className="mt-8 flex items-center justify-center gap-4">
                        <Link href="/questions">
                            <ShimmerButton className="shadow-2xl">
                                <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                                    Explore Questions
                                </span>
                            </ShimmerButton>
                        </Link>
                        <Link href="/questions/ask" className="text-sm font-semibold leading-6 text-white hover:text-neutral-300 transition">
                            Ask a Question <span aria-hidden="true">→</span>
                        </Link>
                    </div>
                </div>
                <BackgroundBeams />
            </div>

            {/* Stats Section */}
            <div className="w-full bg-neutral-950 py-20">
                <div className="mx-auto max-w-7xl px-4">
                    <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                        {data.map((stat, index) => (
                            <div key={index} className="flex flex-col items-center justify-center space-y-2">
                                <span className="text-4xl font-bold text-white md:text-5xl">
                                    {stat.value.toLocaleString()}
                                </span>
                                <span className="text-sm font-medium text-neutral-500 uppercase tracking-widest">
                                    {stat.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="w-full bg-black py-24">
                <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 lg:grid-cols-3">
                    <WobbleCard containerClassName="col-span-1 lg:col-span-2 h-full bg-pink-800 min-h-[500px] lg:min-h-[300px]">
                        <div className="max-w-xs">
                            <h2 className="text-left text-balance text-base font-semibold tracking-[-0.015em] text-white md:text-xl lg:text-3xl">
                                Get Answers to Your Toughest Coding Questions
                            </h2>
                            <p className="mt-4 text-left  text-base/6 text-neutral-200">
                                With over {stats[0].total} questions already answered, our community is ready to help you solve any challenge.
                            </p>
                        </div>
                        <IconWorldQuestion className="absolute -right-10 -top-10 h-64 w-64 text-white/10 md:-right-[10%] lg:-right-[5%]" />
                    </WobbleCard>
                    <WobbleCard containerClassName="col-span-1 min-h-[300px]">
                        <h2 className="max-w-80 text-left text-balance text-base font-semibold tracking-[-0.015em] text-white md:text-xl lg:text-3xl">
                            Earn Reputation and Badges
                        </h2>
                        <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
                            Contribute to the community by answering questions and earn reputation points to unlock new features.
                        </p>
                        <IconTrophy className="absolute -right-4 -top-4 h-32 w-32 text-white/10" />
                    </WobbleCard>
                    <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-blue-900 min-h-[300px] lg:min-h-[400px]">
                        <div className="max-w-sm">
                            <h2 className="max-w-sm text-left text-balance text-base font-semibold tracking-[-0.015em] text-white md:text-xl lg:text-3xl">
                                Join the Developer Discussion
                            </h2>
                            <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
                                Comment on questions and answers to clarify points, share related resources, or just say thanks.
                            </p>
                        </div>
                        <IconMessage className="absolute -right-10 -top-10 h-64 w-64 text-white/10 md:-right-[10%] lg:-right-[5%]" />
                    </WobbleCard>
                </div>
            </div>

            {/* Call to Action */}
            <div className="w-full bg-neutral-950 py-24">
                <div className="mx-auto max-w-4xl px-4 text-center">
                    <h2 className="text-3xl font-bold text-white md:text-5xl">
                        Ready to contribute?
                    </h2>
                    <p className="mx-auto mt-6 max-w-lg text-neutral-400">
                        Become a part of the fastest-growing developer community. Share your expertise and help others grow.
                    </p>
                    <div className="mt-10">
                        <Link href="/register">
                            <ShimmerButton className="mx-auto">
                                <span className="text-lg font-bold text-white">Sign Up Now</span>
                            </ShimmerButton>
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
