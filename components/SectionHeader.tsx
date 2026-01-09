import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  description?: string;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

export default function SectionHeader({
  title,
  description,
  className,
  titleClassName,
  descriptionClassName,
}: SectionHeaderProps) {
  return (
    <div className={cn("text-center mb-12 md:mb-16 space-y-4", className)}>
      <h2
        className={cn(
          "text-3xl font-medium md:text-4xl mb-2 text-foreground",
          titleClassName
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "text-muted-foreground mb-12 max-w-2xl mx-auto",
            descriptionClassName
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
