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
      className={`w-full max-w-97.5 sm:max-w-3xl lg:max-w-[69.375rem] mx-auto   ${className}`}
    >
      {children}
    </div>
  );
};
