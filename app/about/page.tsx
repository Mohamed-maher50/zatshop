import { CheckCircle, Heart, Globe } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "من نحن | متجر ذات",
  description:
    "تعرّف على متجر ذات — رسالتنا، قيمنا، والتزامنا بتقديم منتجات مختارة بعناية لمنزلك واحتياجات الجمال.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="w-full py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-secondary to-background">
        <div className="max-w-7xl mx-auto text-center space-y-6">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
            عن ذات
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-foreground text-balance leading-tight">
            مجموعات مختارة بعناية وبهدف
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            نؤمن بقوة المنتجات المختارة بعناية في تحويل المساحات وتعزيز جودة
            الحياة.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="w-full py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-light text-foreground">
                رسالتنا
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                في ذات، نكرّس جهودنا لتقديم أفضل تشكيلة من أدوات المنزل، التحف
                الزخرفية، ومستحضرات التجميل الفاخرة. يتم اختيار كل منتج بعناية
                فائقة ليلبي معاييرنا الصارمة للجودة، الحِرفية، والقيمة.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                نتعاون مع حرفيين، مصنّعين، وعلامات تجارية موثوقة لنقدم منتجات
                يمكن لعملائنا الاعتماد عليها. رسالتنا بسيطة: جعل تجربة التسوق
                لاحتياجات المنزل ومنتجات الجمال تجربة ممتعة وسلسة.
              </p>
            </div>
            <div className="h-96 bg-muted  overflow-hidden">
              <img
                src="/artisan-craftsmanship-workshop.jpg"
                alt="حِرفية ذات"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="w-full py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
              قيمنا
            </p>
            <h2 className="text-3xl md:text-4xl font-light text-foreground">
              ما الذي يحركنا
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Quality */}
            <div className="space-y-6 p-8  bg-background border border-border hover:shadow-lg transition-shadow">
              <div className="inline-flex p-3  bg-secondary">
                <CheckCircle className="text-foreground" size={28} />
              </div>
              <h3 className="text-xl font-medium text-foreground">
                الجودة أولًا
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                يخضع كل منتج لفحوصات جودة دقيقة لضمان مطابقته لمعاييرنا العالية
                وتوقعاتكم.
              </p>
            </div>

            {/* Care */}
            <div className="space-y-6 p-8  bg-background border border-border hover:shadow-lg transition-shadow">
              <div className="inline-flex p-3  bg-secondary">
                <Heart className="text-foreground" size={28} />
              </div>
              <h3 className="text-xl font-medium text-foreground">
                الاهتمام والمصداقية
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                نهتم بصدق برضاكم. الأصالة والشفافية توجه كل قرار نتخذه.
              </p>
            </div>

            {/* Sustainability */}
            <div className="space-y-6 p-8  bg-background border border-border hover:shadow-lg transition-shadow">
              <div className="inline-flex p-3  bg-secondary">
                <Globe className="text-foreground" size={28} />
              </div>
              <h3 className="text-xl font-medium text-foreground">الاستدامة</h3>
              <p className="text-muted-foreground leading-relaxed">
                نلتزم بالتوريد المسؤول والممارسات الصديقة للبيئة في جميع
                عملياتنا.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="w-full py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-light text-foreground">
              قصتنا
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              تأسس متجر ذات في عام 2007 كمشروع شغوف صغير يهدف إلى جمع أفضل
              منتجات المنزل والتحف المميزة. ما بدأ كمجموعة شخصية مختارة بعناية
              تطور ليصبح وجهة تجارة إلكترونية رائدة تخدم آلاف العملاء حول
              العالم.
            </p>
          </div>

          <p className="text-lg text-muted-foreground leading-relaxed">
            يعمل فريقنا من الخبراء بلا كلل لاكتشاف وتوريد منتجات تحكي قصة. من
            التحف القديمة ذات التاريخ العريق، إلى أدوات المنزل الحديثة المصممة
            للأداء، ومستحضرات التجميل المصنوعة بعناية، يعكس كل منتج في متجرنا
            التزامنا بالتميز.
          </p>

          <p className="text-lg text-muted-foreground leading-relaxed">
            اليوم، نفخر ببناء مجتمع من العملاء الراضين الذين يشاركوننا تقدير
            الجودة، الحِرفية، والتصميم المدروس. نواصل النمو والتطور وتعزيز
            التزامنا بتقديم تجربة تسوق استثنائية.
          </p>
        </div>
      </section>
    </main>
  );
}
