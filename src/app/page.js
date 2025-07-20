'use client';

import { useState } from "react";
import ProposalForm from "@/components/ProposalForm";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Home() {
  const [proposal, setProposal] = useState('');
  const [loading, setLoading] = useState(false);

  const generateProposal = async (formData) => {
    setLoading(true);
    setProposal('');

    const res = await fetch('/api', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    setLoading(false);
    setProposal(data.proposal);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-10 text-center">Upwork Proposal Generator</h1>

      <div className="grid grid-cols-1 md:grid-cols-2  gap-8 w-full max-w-6xl">

        {/* Left Side: Form */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <ProposalForm onSubmit={generateProposal} loading={loading} />
        </div>

        {/* Right Side: Generated Proposal */}
        <div className="flex flex-col gap-10">
          <div className="w-full max-w-2xl p-4 border rounded-xl bg-gray-100 h-[500px] overflow-y-auto">
            <h2 className="text-2xl font-semibold mb-2">Generated Proposal:</h2>
            {loading ? (
              <div className="space-y-4">
                <Skeleton className="h-6 w-3/4 bg-gray-300 animate-pulse" />
                <Skeleton className="h-6 w-full bg-gray-300 animate-pulse" />
                <Skeleton className="h-6 w-5/6 bg-gray-300 animate-pulse" />
                <Skeleton className="h-6 w-2/3 bg-gray-300 animate-pulse" />
                <Skeleton className="h-6 w-1/2 bg-gray-300 animate-pulse" />
              </div>
            ) : proposal ? (
              <div className="whitespace-pre-wrap">{proposal}</div>
            ) : (
              <p className="text-gray-400">Your proposal will appear here after generation.</p>
            )}
          </div>
          {proposal &&
            <Button
              onClick={() => {
                navigator.clipboard.writeText(proposal);
                toast.success("Copied to Clipboard!")
              }}
              className='w-1/2 hover:cursor-pointer'
            >
              Copy to Clipboard
            </Button>
          }
        </div>
      </div>
    </main>
  );
}
