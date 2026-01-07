import { Mail, Phone, MapPin, Clock } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "تواصل معنا | متجر ذات",
  description:
    "تواصل مع متجر ذات. نحن هنا لمساعدتك في الأسئلة المتعلقة بالمنتجات والطلبات وغير ذلك.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="w-full py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-secondary to-background">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
            تواصل معنا
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-foreground text-balance leading-tight">
            يسعدنا سماع رأيك
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            هل لديك أسئلة حول منتجاتنا أو تحتاج إلى مساعدة؟ تواصل مع فريقنا
            وسنرد عليك في أقرب وقت ممكن.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="w-full py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Contact Info Cards */}
          <div className="p-8  bg-secondary border border-border space-y-4">
            <div className="inline-flex p-3  bg-background">
              <Mail className="text-foreground" size={24} />
            </div>
            <h3 className="text-lg font-medium text-foreground">
              البريد الإلكتروني
            </h3>
            <p className="text-muted-foreground">hello@artisan.com</p>
            <p className="text-sm text-muted-foreground">
              نرد عادة خلال 24 ساعة
            </p>
          </div>

          <div className="p-8  bg-secondary border border-border space-y-4">
            <div className="inline-flex p-3  bg-background">
              <Phone className="text-foreground" size={24} />
            </div>
            <h3 className="text-lg font-medium text-foreground">الهاتف</h3>
            <p className="text-muted-foreground">(555) 123-4567</p>
            <p className="text-sm text-muted-foreground">
              من الإثنين إلى الجمعة، 9 صباحًا – 6 مساءً
            </p>
          </div>

          <div className="p-8  bg-secondary border border-border space-y-4">
            <div className="inline-flex p-3  bg-background">
              <MapPin className="text-foreground" size={24} />
            </div>
            <h3 className="text-lg font-medium text-foreground">الموقع</h3>
            <p className="text-muted-foreground">سان فرانسيسكو، كاليفورنيا</p>
            <p className="text-sm text-muted-foreground">
              نخدم العملاء في جميع أنحاء العالم
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto">
          <div className="p-8 md:p-12  border border-border bg-secondary">
            <h2 className="text-2xl font-light text-foreground mb-8">
              أرسل لنا رسالة
            </h2>

            <form className="space-y-6">
              {/* Name */}
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-foreground"
                >
                  الاسم الكامل
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="أحمد محمد"
                  className="w-full px-4 py-3  bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                  required
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-foreground"
                >
                  البريد الإلكتروني
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="ahmed@example.com"
                  className="w-full px-4 py-3  bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                  required
                />
              </div>

              {/* Subject */}
              <div className="space-y-2">
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-foreground"
                >
                  الموضوع
                </label>
                <select
                  id="subject"
                  className="w-full px-4 py-3  bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                  required
                >
                  <option value="">اختر الموضوع...</option>
                  <option value="product">استفسار عن منتج</option>
                  <option value="order">سؤال عن طلب</option>
                  <option value="feedback">ملاحظات أو اقتراحات</option>
                  <option value="partnership">شراكة</option>
                  <option value="other">أخرى</option>
                </select>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-foreground"
                >
                  الرسالة
                </label>
                <textarea
                  id="message"
                  placeholder="اكتب تفاصيل استفسارك هنا..."
                  rows={6}
                  className="w-full px-4 py-3  bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all resize-none"
                  required
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full px-8 py-4 bg-primary text-primary-foreground font-medium  hover:bg-primary/90 transition-all duration-200"
              >
                إرسال الرسالة
              </button>

              <p className="text-sm text-muted-foreground text-center">
                سنقوم بالرد عليك في أقرب وقت ممكن. شكرًا لتواصلك معنا.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Hours Section */}
      <section className="w-full py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-secondary">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
            <div className="flex-shrink-0">
              <div className="inline-flex p-4  bg-background">
                <Clock className="text-foreground" size={32} />
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-light text-foreground">
                ساعات العمل
              </h3>
              <p className="text-muted-foreground">
                من الإثنين إلى الجمعة: 9:00 صباحًا – 6:00 مساءً
              </p>
              <p className="text-muted-foreground">السبت – الأحد: مغلق</p>
              <p className="text-sm text-muted-foreground mt-4">
                نرد على جميع الاستفسارات خلال 24 ساعة عمل. في الحالات الطارئة،
                يرجى الاتصال بنا خلال ساعات العمل.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
