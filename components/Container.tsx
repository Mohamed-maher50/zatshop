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
        `w-full   sm:max-w-11/12 px-2 sm:px-7 lg:max-w-7xl  mx-auto`,
        className
      )}
    >
      {children}
    </div>
  );
};
