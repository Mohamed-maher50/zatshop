"use client";
import { reviewFormValues, reviewSchema } from "@/schema/reviewSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Reviews } from "./api/api";
import { Rating, RatingButton } from "@/components/ui/shadcn-io/rating";
import {
  createReviewAction,
  updateReviewAction,
} from "@/app/actions/views.actions";
export interface ReviewDialogProps {
  initialValues?: {
    _id: string;
    review: string;
    rating: number;
  };
  productId: string;
  children: React.ReactNode;
}
export function ReviewDialog({
  initialValues,
  productId,
  children,
}: ReviewDialogProps) {
  const form = useForm<reviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      review: initialValues?.review || "",
      rating: initialValues?.rating || 3,
      productId,
    },
    values: {
      productId,
      review: initialValues?.review || "",
      rating: initialValues?.rating || 3,
    },
  });
  const router = useRouter();
  const closeRef = useRef<HTMLButtonElement | null>(null);

  const onSubmit = async (values: reviewFormValues) => {
    const payload = initialValues
      ? { ...values, _id: initialValues._id }
      : { ...values, product: productId };

    const promise = initialValues
      ? updateReviewAction(initialValues._id, payload)
      : createReviewAction(payload);

    const loadingMessage = initialValues
      ? "جاري تعديل التقييم"
      : "جاري إضافة التقييم";

    const errorMessage = initialValues
      ? "حدث خطأ أثناء تعديل التقييم"
      : "حدث خطأ أثناء إضافة التقييم";

    const successMessage = initialValues
      ? "تم تعديل التقييم بنجاح"
      : "تم إضافة التقييم بنجاح";

    await new Promise((res) => {
      toast.promise(promise, {
        loading: loadingMessage,
        error: (error) => {
          return error.message || errorMessage;
        },
        success: (res) => {
          if (initialValues) form.reset({ ...res.data.data });
          else form.reset({});
          router.refresh();
          closeRef.current?.click();
          return successMessage;
        },
        finally: res.bind(null, true),
      });
    });
  };
  return (
    <Dialog>
      <DialogContent className="sm:max-w-[500px] bg-card border-border">
        <DialogHeader>
          <DialogTitle>
            {initialValues ? "تعديل التقييم" : "إضافة تقييم"}
          </DialogTitle>
          <DialogDescription>
            شاركنا رأيك في المنتج لمساعدة الآخرين.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Rating */}
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>التقييم</FormLabel>

                  <FormControl>
                    <Rating
                      {...field}
                      value={field.value}
                      onChange={(v, value) => field.onChange(value)}
                    >
                      {Array.from({ length: 5 }).map((_, index) => (
                        <RatingButton key={index} className="text-[#C69B7B]" />
                      ))}
                    </Rating>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Review Text */}
            <FormField
              control={form.control}
              name="review"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>رأيك في المنتج</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      rows={4}
                      placeholder="اكتب تجربتك مع المنتج..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogClose ref={closeRef} className="hidden" />

            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting || !form.formState.isDirty}
            >
              {form.formState.isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {initialValues ? "حفظ التعديلات" : "إضافة التقييم"}
            </Button>
          </form>
        </Form>
      </DialogContent>

      {children}
    </Dialog>
  );
}
