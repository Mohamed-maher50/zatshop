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
      className={`w-full max-w-97.5 sm:max-w-3xl lg:max-w-277.5 mx-auto px-4 sm:px-6 lg:px-8 ${className}`}
    >
      {children}
    </div>
  );
};
