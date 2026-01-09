import Image from "next/image";

interface BrandCardProps {
  id: string;
  name: string;
  logo: string;
  description?: string;
  featured?: boolean;
  onClick?: () => void;
}

export function BrandCard({
  id,
  name,
  logo,
  description,
  featured = false,
}: BrandCardProps) {
  return (
    <button
      className="group w-full h-full flex flex-col items-center justify-center p-6 md:p-8 bg-card border border-border rounded-lg
                 hover:border-foreground/30 transition-all duration-300 cursor-pointer"
    >
      {/* حاوية الشعار */}
      <div
        className="w-20 h-20 md:w-24 md:h-24 mb-4 flex items-center justify-center rounded-lg bg-secondary
                   transition-all duration-300
                   group-hover:scale-110 group-hover:bg-muted"
      >
        <Image
          src={logo || "/placeholder.svg"}
          alt={name}
          width={80}
          height={80}
          className="object-contain transition-all duration-300
                     group-hover:brightness-0"
        />
      </div>

      {/* اسم العلامة التجارية */}
      <h3
        className="text-lg md:text-xl font-semibold text-foreground text-center
                   transition-all duration-300
                   group-hover:scale-105"
      >
        {name}
      </h3>

      {/* الوصف */}
      {description && (
        <p
          className="text-xs md:text-sm text-muted-foreground text-center mt-2 max-w-xs
                     transition-all duration-300 overflow-hidden
                     max-h-0 opacity-0
                     group-hover:max-h-20 group-hover:opacity-100"
        >
          {description}
        </p>
      )}

      {/* مؤشر أسفل البطاقة */}
      <div
        className="mt-4 h-0.5 bg-foreground transition-all duration-300
                   w-0 group-hover:w-8"
      />
    </button>
  );
}
