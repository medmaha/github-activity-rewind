"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { toast } from "sonner";
import { Loader2, Star } from "lucide-react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { createFeedback } from "@/lib/feedback";
import { GhButton, GhInput } from "./rewind/primitives";

type Props = {
  isOpen: boolean;
  onClose: (isOpen: boolean) => void;
};
export default function FeedbackSlider(props: Props) {
  const [rating, setRating] = useState(4);
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSliderChange = (value: number[]) => {
    setRating(value[0]);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    try {
      setIsLoading(true);

      const form = event.currentTarget as HTMLFormElement;
      const formData = new FormData(form);
      const json = Object.fromEntries(formData.entries());

      const created = await createFeedback({
        ...(json as any),
        rating,
      });
      if (!created) throw new Error("Failed to created your feedback");

      toast.success("Thank you for your feedback!", {
        description: `You rated the app ${rating} out of 10.`,
      });
      setSubmitted(true);
      setRating(4);
      props.onClose(false);
    } catch (error: any) {
      toast.error("Failed to created your feedback", {
        position: "bottom-left",
        description: error.massage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet
      open={props.isOpen}
      onOpenChange={(o) => {
        props.onClose(o);
      }}
    >
      <SheetContent className="max-w-md mx-auto  w-100 sm:w-135 max-h-svh overflow-hidden overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Give a Feedback</SheetTitle>
          <SheetDescription>
            Please rate your experience with GitHub Rewind
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="space-y-6 mt-8">
          <div className="grid gap-2 w-full">
            <label className="" htmlFor="author">
              Your Name
            </label>
            <Input
              name="author"
              id="author"
              required
              minLength={4}
              placeholder="tell us who you are"
            />
          </div>
          <div className="grid gap-2 w-full">
            <label htmlFor="subject" className="inline-flex items-center">
              Subject{" "}
              <small className="ml-2 text-muted-foreground">(Optional)</small>
            </label>
            <GhInput
              name="subject"
              id="subject"
              placeholder="your subject here"
            />
          </div>
          <div className="grid gap-2 w-full">
            <label className="" htmlFor="content">
              Content
            </label>
            <Textarea
              name="content"
              id="content"
              required
              minLength={10}
              maxLength={500}
              className="max-h-50"
              placeholder="write your feedback here..."
            />
          </div>
          <div className="grid gap-2 w-full">
            <label className="inline-flex items-center gap-5" htmlFor="rating">
              Rate us
              <div className="text-center flex-1 max-w-[55%]">
                <span className="text-2xl font-bold">{rating}</span>
                <span className="text-sm text-gray-400"> / 5</span>
              </div>
            </label>
            <div className="flex items-center space-x-2">
              <Star className="text-yellow-400" />
              <Slider
                id="rating"
                defaultValue={[4]}
                max={5}
                step={1}
                onValueChange={handleSliderChange}
                disabled={submitted}
                className="w-full"
              />
              <Star className="text-yellow-400" />
            </div>
          </div>
          <div className="pt-6 w-full">
            <GhButton
              className="w-full"
              disabled={submitted}
            >
              {!isLoading && (
                <>
                  {submitted ? "Thanks for your feedback!" : "Submit Feedback"}
                </>
              )}
              {isLoading && (
                <>
                  <Loader2 className="animate-spin mr-2" />
                  <span>Submitting...</span>
                </>
              )}
            </GhButton>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
