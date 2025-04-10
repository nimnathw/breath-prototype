
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { FAQ, MeditationInstructions, AboutUs } from '@/components/content';
import { useToast } from "@/hooks/use-toast"
import { Icons } from '@/components/icons';

const MeditationContent = () => (
  <div className="p-4 rounded-lg shadow-md bg-secondary">
    <h2 className="text-2xl font-semibold mb-2">Meditation Information</h2>
    <p className="text-gray-700">
      This is where meditation information will be displayed.
    </p>
    <img src="https://picsum.photos/800/400" alt="Placeholder meditation image" className="mt-4 rounded-md" />
  </div>
);

export default function Home() {
  const [botQuestion, setBotQuestion] = useState('');
  const { toast } = useToast()

  const handleBotSubmit = async () => {
    if (botQuestion.trim() === '') {
      toast({
        title: "Error",
        description: "Please enter a question.",
        variant: "destructive",
      })
      return;
    }

    // Call to GenAI function will be added here later.
    toast({
      title: "Success",
      description: `Question: ${botQuestion}`,
    })
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="px-4 py-2 flex justify-end items-center border-b">
        <Button variant="outline" className="mr-2">
          Google Login
        </Button>
        <Button>Subscribe</Button>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-4">
        <MeditationContent />
      </main>

      {/* Bottom Navigation Ribbon */}
      <nav className="sticky bottom-0 bg-primary py-3 px-4 border-t">
        <div className="flex justify-around items-center">
          <Button variant="ghost">
            <Icons.help className="h-5 w-5 mr-2" />
            FAQ
          </Button>
          <Button variant="ghost">
            <Icons.workflow className="h-5 w-5 mr-2" />
            Instructions
          </Button>
          <Button variant="ghost">
            <Icons.home className="h-5 w-5 mr-2" />
            About Us
          </Button>

          {/* Meditation Q&A Bot Modal */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost">
                <Icons.messageSquare className="h-5 w-5 mr-2" />
                Ask Bot
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogTitle>Meditation Q&A Bot</DialogTitle>
              <DialogDescription>
                Ask a question about meditation.
              </DialogDescription>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Input
                    id="question"
                    value={botQuestion}
                    onChange={(e) => setBotQuestion(e.target.value)}
                    className="col-span-3"
                  />
                  <Button onClick={handleBotSubmit} className="col-span-1">Submit</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </nav>
    </div>
  );
}
