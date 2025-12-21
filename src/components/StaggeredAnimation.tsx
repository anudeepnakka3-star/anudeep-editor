import { ReactNode } from "react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";

interface StaggeredItemProps {
  children: ReactNode;
  index: number;
  className?: string;
  baseDelay?: number;
  staggerDelay?: number;
}

export const StaggeredItem = ({ 
  children, 
  index, 
  className,
  baseDelay = 0,
  staggerDelay = 100 
}: StaggeredItemProps) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-500 ease-out",
        isVisible 
          ? "opacity-100 translate-y-0 scale-100" 
          : "opacity-0 translate-y-6 scale-95",
        className
      )}
      style={{ transitionDelay: `${baseDelay + index * staggerDelay}ms` }}
    >
      {children}
    </div>
  );
};

interface StaggeredTextProps {
  children: ReactNode;
  index?: number;
  className?: string;
  delay?: number;
}

export const StaggeredText = ({ 
  children, 
  index = 0, 
  className,
  delay = 0 
}: StaggeredTextProps) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-600 ease-out",
        isVisible 
          ? "opacity-100 translate-y-0" 
          : "opacity-0 translate-y-4",
        className
      )}
      style={{ transitionDelay: `${delay + index * 80}ms` }}
    >
      {children}
    </div>
  );
};
