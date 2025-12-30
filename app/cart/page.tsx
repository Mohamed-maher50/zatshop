"use client";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Minus, MinusIcon, Plus, PlusIcon, X } from "lucide-react";
import { ButtonGroup, ButtonGroupText } from "@/components/ui/button-group";
import Image from "next/image";
import { useState } from "react";
import { Cancel, Delete, HugeiconsFreeIcons } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartItemsTableProps {
  items: CartItem[];
  onQuantityChange: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

const CartPage = () => {
  const calculateSubtotal = (price: number, quantity: number) => {
    return (price * quantity).toFixed(2);
  };
  const [quantity1, setQuantity1] = useState(1);
  return (
    <div className="pt-5">
      <Breadcrumb className="mt-5">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1">
                <BreadcrumbEllipsis className="size-4" />
                <span className="sr-only">Toggle menu</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem>Documentation</DropdownMenuItem>
                <DropdownMenuItem>Themes</DropdownMenuItem>
                <DropdownMenuItem>GitHub</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/docs/components">Components</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="py-12.5">
        <h2 className="text-natural-800 font-semibold text-2xl">
          Cart (3 item)
        </h2>
        <div className="last:border-b-red-600 sm:hidden last:border">
          <div className="flex gap-5   last:border-red-400 relative w-fit  border-b p-10">
            <div>
              <Image
                src={
                  "https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }
                alt=""
                width={99}
                height={99}
                className="w-24.75 h-24.75 "
              />
            </div>
            <div className="">
              <Button
                variant={"ghost"}
                className={"text-destructive absolute right-0 top-9"}
              >
                <HugeiconsIcon icon={Delete} />
              </Button>
              <h1 className="text-base font-bold">
                Porcelain Dinner Plate (27cm)
              </h1>
              <div className="flex gap-1">
                <span className="">Size:</span>
                <span className="text-muted-foreground">Large</span>
              </div>
              <div className="flex justify-between mt-3 gap-1">
                <span className="font-bold text-xl">500</span>
                <span>
                  <ButtonGroup>
                    <Button
                      disabled={quantity1 === 0}
                      onClick={() => setQuantity1(Math.max(0, quantity1 - 1))}
                      size="lg"
                      variant="outline"
                    >
                      <MinusIcon />
                    </Button>
                    <ButtonGroupText className="min-w-12 justify-center">
                      {quantity1}
                    </ButtonGroupText>
                    <Button
                      onClick={() => setQuantity1(quantity1 + 1)}
                      size="lg"
                      variant="outline"
                    >
                      <PlusIcon />
                    </Button>
                  </ButtonGroup>
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-5   last:border-none relative w-fit  border-b p-10">
            <div>
              <Image
                src={
                  "https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }
                alt=""
                width={99}
                height={99}
                className="w-24.75 h-24.75 "
              />
            </div>
            <div className="">
              <Button
                variant={"ghost"}
                className={"text-destructive absolute right-0 top-9"}
              >
                <HugeiconsIcon icon={Delete} />
              </Button>
              <h1 className="text-base font-bold">
                Porcelain Dinner Plate (27cm)
              </h1>
              <div className="flex gap-1">
                <span className="">Size:</span>
                <span className="text-muted-foreground">Large</span>
              </div>
              <div className="flex justify-between mt-3 gap-1">
                <span className="font-bold text-xl">500</span>
                <span>
                  <ButtonGroup>
                    <Button
                      disabled={quantity1 === 0}
                      onClick={() => setQuantity1(Math.max(0, quantity1 - 1))}
                      size="lg"
                      variant="outline"
                    >
                      <MinusIcon />
                    </Button>
                    <ButtonGroupText className="min-w-12 justify-center">
                      {quantity1}
                    </ButtonGroupText>
                    <Button
                      onClick={() => setQuantity1(quantity1 + 1)}
                      size="lg"
                      variant="outline"
                    >
                      <PlusIcon />
                    </Button>
                  </ButtonGroup>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="max-sm:hidden">
          <Table>
            {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
            <TableHeader>
              <TableRow className="border-b-primary">
                <TableHead>X</TableHead>
                <TableHead>Photo</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="w-30 text-center">Quanlity</TableHead>
                <TableHead>Subtotal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="text-sm font-semibold">
              <TableRow className=" border-b-primary ">
                <TableCell className="text-destructive">
                  <Button variant={"ghost"}>
                    <HugeiconsIcon icon={Cancel} />
                  </Button>
                </TableCell>
                <TableCell className="relative min-w-30 min-h-35">
                  <Image
                    src={
                      "https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    }
                    alt="sdf"
                    width={120}
                    height={140}
                    className="object-cover"
                  />
                </TableCell>
                <TableCell className="max-w-full shrink-0 w-fit text-natural-800 font-semibold text-sm whitespace-pre-wrap text-justify">
                  Lorem ipsum dolor sit amet
                </TableCell>
                <TableCell>$59</TableCell>
                <TableCell>
                  <ButtonGroup>
                    <Button
                      disabled={quantity1 === 0}
                      onClick={() => setQuantity1(Math.max(0, quantity1 - 1))}
                      size="lg"
                      variant="outline"
                    >
                      <MinusIcon />
                    </Button>
                    <ButtonGroupText className="min-w-12 justify-center">
                      {quantity1}
                    </ButtonGroupText>
                    <Button
                      onClick={() => setQuantity1(quantity1 + 1)}
                      size="lg"
                      variant="outline"
                    >
                      <PlusIcon />
                    </Button>
                  </ButtonGroup>
                </TableCell>
                <TableCell className="text-primary">234324</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className=" grid mt-10  grid-rows-2 max-w-96 gap-2.5 grid-cols-2 ">
          <Input className="h-full p-2 ring-0 " placeholder="Coupon code" />
          <Button variant={"default"} className={"grow"} size={"lg"}>
            Apply Coupon
          </Button>
        </div>
        <div className=" ms-auto p-14 flex  flex-col bg-secondary max-sm:w-full sm:w-125">
          <span className="text-natural-800 text-xl font-semibold ">
            Cart totals
          </span>
          <div className="py-10">
            <div className="flex  text-base flex-col gap-2">
              <div className="flex font-semibold justify-between">
                <span className="">Subtotal:</span>
                <span>$465.00</span>
              </div>
              <div className="flex font-semibold justify-between">
                <span className="">Cart totals:</span>
                <span>$465.00</span>
              </div>
            </div>
          </div>
          <Button variant={"default"} size={"lg"}>
            Proceed to checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
