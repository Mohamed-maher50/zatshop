import { FC, PropsWithChildren } from "react";

const CategoriesGrid: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="grid gap-2.5 gap-y-12 md:gap-y-10  grid-rows-[auto_1fr_auto_1fr] md:grid-cols-4  md:gap-7.5  ">
      {children}
    </div>
  );
};

export default CategoriesGrid;
