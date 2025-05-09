"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface CopyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  textToCopy: string;
  buttonText?: string;
  copiedText?: string;
}

export default function CopyButton({ textToCopy, buttonText = "Copy", copiedText = "Copied!", className, ...props }: CopyButtonProps) {
  const [isCopied, setIsCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = async () => {
    if (!textToCopy) {
      toast({
        title: "Nothing to copy",
        description: "The text field is empty.",
        variant: "destructive",
      });
      return;
    }
    try {
      await navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);
      toast({
        title: "Copied to clipboard!",
        description: "The text has been successfully copied.",
      });
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
      toast({
        title: "Copy failed",
        description: "Could not copy text to clipboard.",
        variant: "destructive",
      });
    }
  };

  return (
    <Button
      onClick={handleCopy}
      variant="outline"
      size="sm"
      className={cn("gap-2", className)}
      {...props}
      disabled={!textToCopy || props.disabled}
    >
      {isCopied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
      {isCopied ? copiedText : buttonText}
    </Button>
  );
}
