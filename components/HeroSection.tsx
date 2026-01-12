import { ArrowRight } from "lucide-react";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="relative w-full py-20 md:py-32  lg:py-16 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-background to-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* المحتوى الأيسر */}
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
                مرحبًا بك في ذات
              </p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-foreground text-balance leading-tight">
                مختار بعناية لمنزلك
              </h2>
            </div>

            <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
              اكتشف مجموعة مختارة بعناية من أدوات المنزل، التحف الخالدة،
              ومستحضرات التجميل الفاخرة. كل ما تحتاجه لجعل مساحتك أكثر جمالًا.
            </p>
            {/* 
            <button className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-medium  hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 transition-all duration-200 hover:gap-4">
              ابدأ التسوق
              <ArrowRight size={20} />
            </button> */}
          </div>

          {/* الصورة اليمنى */}
          <div className="w-full h-96  relative md:h-96 lg:h-[38.6rem]  overflow-hidden bg-muted border border-border/50">
            <Image
              src="/modern-home-decor-lifestyle-collection.jpg"
              alt="عرض مجموعة منزلية مختارة بعناية"
              className="w-full h-full object-cover"
              fill
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
