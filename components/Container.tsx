import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}
export const Container: React.FC<ContainerProps> = ({
  children,
  className = "",
}) => {
  return (
    <div
      className={cn(
        `w-full   sm:max-w-11/12 px-7 lg:max-w-[69.375rem] mx-auto`,
        className
      )}
    >
      {children}
    </div>
  );
};
