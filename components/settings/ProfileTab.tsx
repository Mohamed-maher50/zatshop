"use client";

import type React from "react";

import { memo, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, Upload } from "lucide-react";
import UpdatePasswordForm from "./forms/UpdatePasswordForm";
import DeleteAccountForm from "./forms/DeleteAccountForm";
import { User } from "@/features/users/api";
import { User as UserType } from "@/types";
import { toast } from "sonner";
import { getDirtyValues } from "@/lib/useFormHook";
import { appApi } from "@/lib/axios";
import { UploadApiResponse } from "cloudinary";
import { AxiosResponse } from "axios";
export const profileSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    image: z.string().url().nullable(),
  })
  .partial();

const ProfileTab = () => {
  const [loadingUserProfile, setLoadingUserProfile] = useState(false);
  const [userProfile, setUserProfile] = useState<Partial<UserType>>({
    email: "",
    name: "",
    image: "",
  });

  const [avatar, setAvatar] = useState<{
    file: File | null;
    url: string | null;
  }>({
    file: null,
    url: "",
  });
  useEffect(() => {
    setLoadingUserProfile(true);
    (async () => {
      const userResponse = await User.getUserProfile();
      setUserProfile(userResponse.data.data);
      setAvatar({ file: null, url: userResponse.data.data.image || "" });
      setLoadingUserProfile(false);
    })();
  }, []);
  const profileForm = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      email: "",
      name: "",
      image: "",
    },
    values: userProfile,
  });
  async function onProfileSubmit(values: z.infer<typeof profileSchema>) {
    const dirtyFields = getDirtyValues(
      profileForm.formState.dirtyFields,
      profileForm.getValues()
    );

    if (dirtyFields.image == undefined) dirtyFields.image = null;
    if (dirtyFields.image) {
      const uploadImageResponse: AxiosResponse<UploadApiResponse | undefined> =
        await appApi.post("/uploads/", avatar.file, {
          headers: {
            "x-type-image": "avatar",
          },
        });
      dirtyFields.image = uploadImageResponse.data?.secure_url;
    }

    const promise = User.updateProfile(dirtyFields);

    toast.promise(promise, {
      loading: "يتم تحديث البيانات",
      error: (err) => {
        return "حصل مشكلة في تحديث ";
      },
      success: () => {
        if (dirtyFields.image)
          setAvatar({ file: null, url: dirtyFields.image });

        profileForm.reset({ ...profileForm.getValues(), ...dirtyFields });
        return "تم تحديث البيانات";
      },
    });
  }
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      profileForm.setValue("image", url, {
        shouldDirty: true,
        shouldValidate: true,
      });
      setAvatar({
        url,
        file: file,
      });
    }
  };

  return (
    <div className="space-y-8">
      {/* User Profile Card */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">ملف المستخدم</CardTitle>
          <CardDescription>
            إدارة ملفك الشخصي العام وتفاصيل الحساب.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <Avatar className="h-24 w-24 border-2 border-border">
              <AvatarImage src={avatar.url || "/placeholder.svg"} />
              <AvatarFallback>BC</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  className="relative cursor-pointer"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  رفع صورة
                  <input
                    type="file"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={handleImageUpload}
                    accept="image/*"
                    disabled={loadingUserProfile}
                  />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    profileForm.setValue("image", undefined, {
                      shouldDirty: true,
                    });
                    setAvatar({
                      file: null,
                      url: null,
                    });
                  }}
                  disabled={
                    loadingUserProfile || !profileForm.getValues("image")
                  }
                >
                  إزالة
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                JPG, GIF أو PNG. الحد الأقصى للحجم 800K
              </p>
            </div>
          </div>

          <Form {...profileForm}>
            <form
              onSubmit={profileForm.handleSubmit(onProfileSubmit)}
              className="grid gap-4 sm:grid-cols-2"
            >
              <FormField
                control={profileForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الاسم الكامل</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className=" border-border"
                        disabled={field.disabled || loadingUserProfile}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={profileForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>البريد الإلكتروني</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        className=" border-border"
                        disabled={field.disabled || loadingUserProfile}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="sm:col-span-2">
                <Button
                  disabled={
                    !profileForm.formState.isDirty || loadingUserProfile
                  }
                  type="submit"
                  className="w-full sm:w-auto"
                >
                  {profileForm.formState.isSubmitting && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  حفظ التغييرات
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Update Password Card */}
      <UpdatePasswordForm />

      {/* Danger Zone Card */}
      <DeleteAccountForm />
    </div>
  );
};
export default memo(ProfileTab);
