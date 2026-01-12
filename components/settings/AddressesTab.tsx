import { buttonVariants } from "@/components/ui/button";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { MapPin, Plus, Edit, Phone, Home } from "lucide-react";
import { AddressDialog } from "./forms/AddressDialog";
import { DialogTrigger } from "../ui/dialog";

import { User } from "@/features/users/api";
import DeleteAddressDialog from "./forms/DeleteAddressDialog";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../ui/empty";
import { HugeiconsIcon } from "@hugeicons/react";
import RestQueryButton from "../RestQueryButton";
import { Location08Icon } from "@hugeicons/core-free-icons";

export async function AddressesTab() {
  const addressesResponse = await User.getAddresses();
  const { data } = addressesResponse;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold tracking-tight">العناوين المحفوظة</h2>
        <AddressDialog>
          <DialogTrigger
            className={buttonVariants({ size: "sm", className: "gap-2" })}
          >
            <Plus className="w-4 h-4" />
            إضافة عنوان
          </DialogTrigger>
        </AddressDialog>
      </div>
      <Empty hidden={!!data.data.length} className="min-h-96">
        <EmptyHeader>
          <EmptyMedia variant="default">
            <HugeiconsIcon className="size-8" icon={Location08Icon} />
          </EmptyMedia>
          <EmptyTitle>لا توجد عناوين محفوظة</EmptyTitle>
          <EmptyDescription>
            لم تقم بإضافة أي عنوان بعد. أضف عنوانك الآن لتسهيل وتسريع عملية
            الشراء.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <AddressDialog>
            <DialogTrigger
              className={buttonVariants({
                size: "sm",
                variant: "secondary",
                className: "gap-2",
              })}
            >
              <Plus className="w-4 h-4" />
              إضافة عنوان
            </DialogTrigger>
          </AddressDialog>
        </EmptyContent>
      </Empty>

      <div className="grid gap-6 sm:grid-cols-2">
        {data.data.map((address) => (
          <Card
            key={address._id}
            className="bg-card border-border hover:border-primary/50 transition-colors"
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <Home className="w-4 h-4 text-muted-foreground" />
                  <CardTitle className="text-lg">
                    {address.firstName} {address.lastName}
                  </CardTitle>
                </div>
                <div className="flex gap-1">
                  <AddressDialog initialValues={address}>
                    <DialogTrigger
                      className={buttonVariants({
                        size: "icon",
                        variant: "ghost",
                        className: "gap-2",
                      })}
                    >
                      <Edit className="w-4 h-4" />
                    </DialogTrigger>
                  </AddressDialog>
                  <DeleteAddressDialog addressId={address._id} />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex gap-2">
                <MapPin className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                <div className="text-muted-foreground">
                  <p className="text-foreground">{address.address}</p>
                  {address.apartment && <p>{address.apartment}</p>}
                  <p>
                    {address.city}, {address.governorate}
                  </p>
                </div>
              </div>
              <div className="flex gap-2 items-center text-muted-foreground">
                <Phone className="w-4 h-4 shrink-0" />
                <span>{address.phone}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
