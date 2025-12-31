"use client";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { HugeiconsIcon } from "@hugeicons/react";
import { Close, Filter, FilterVerticalIcon } from "@hugeicons/core-free-icons";
const categories = [
  {
    name: "Electronics",
    subcategories: ["Phones", "Laptops", "Cameras", "Accessories"],
  },
  {
    name: "Fashion",
    subcategories: ["Men", "Women", "Shoes", "Bags"],
  },
  {
    name: "Books",
    subcategories: ["Fiction", "Non-fiction", "Children", "Education"],
  },
  {
    name: "Sports",
    subcategories: ["Fitness", "Football", "Cycling", "Swimming"],
  },
  {
    name: "Home",
    subcategories: ["Furniture", "Kitchen", "Decor", "Lighting"],
  },
  {
    name: "Beauty",
    subcategories: ["Makeup", "Skincare", "Haircare"],
  },
  {
    name: "Toys",
    subcategories: ["Action Figures", "Puzzles", "Educational"],
  },
  {
    name: "Automotive",
    subcategories: ["Car Care", "Accessories", "Tools"],
  },
];
import { Minus, Plus } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
const data = [
  {
    goal: 400,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 239,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 349,
  },
];

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ColorButton } from "./page";
export default function ProductsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [goal, setGoal] = useState(350);
  function onClick(adjustment: number) {
    setGoal(Math.max(200, Math.min(400, goal + adjustment)));
  }

  return (
    <>
      <Breadcrumb className="mt-5">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/docs/components">Shop</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <main className=" min-h-screen pt-12 flex justify-center items-center">
        <div className="flex gap-6 ">
          <aside className="w-73.75 max-sm:hidden divide-y pb-6">
            <div className="flex justify-between">
              <span className="text-xl font-bold  pb-6">Filters</span>
              <span>
                <HugeiconsIcon
                  icon={FilterVerticalIcon}
                  className="text-muted-foreground"
                />
              </span>
            </div>
            <Accordion
              collapsible
              defaultValue="item-1"
              type="single"
              className="w-full"
            >
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <span className="text-xl  font-bold">Categories</span>
                </AccordionTrigger>
                <AccordionContent className="flex text-muted-foreground flex-col pt-2 gap-4 text-balance">
                  {categories.map((c) => {
                    return (
                      <span className="hover:underline cursor-pointer">
                        {c.name}
                      </span>
                    );
                  })}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Accordion
              collapsible
              defaultValue="item-1"
              type="single"
              className="w-full"
            >
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <span className="text-xl font-bold">Price</span>
                </AccordionTrigger>
                <AccordionContent className="flex flex-col pt-2 gap-4 text-balance">
                  <Slider
                    defaultValue={[33, 100]}
                    max={100}
                    value={[2, 50]}
                    className=""
                    step={1}
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Accordion
              collapsible
              defaultValue="item-1"
              type="single"
              className="w-full"
            >
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <span className="text-xl font-bold">Sizes</span>
                </AccordionTrigger>
                <AccordionContent className="flex  flex-wrap gap-4 text-balance">
                  {Array.from({ length: 4 }, (_, idx) => (
                    <Button
                      variant={"outline"}
                      className={"grow"}
                      size={"lg"}
                      key={idx}
                    >
                      {
                        ["lg", "sm", "xs", "XXL", "md"][
                          Math.floor(Math.random() * 4)
                        ]
                      }
                    </Button>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Accordion
              collapsible
              defaultValue="item-1"
              type="single"
              className="w-full"
            >
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <span className="text-xl font-bold">Sizes</span>
                </AccordionTrigger>
                <AccordionContent className="flex  flex-wrap gap-4 text-balance">
                  {Array.from({ length: 4 }, (_, idx) => (
                    <ColorButton
                      key={idx}
                      hex={`#${Math.floor(Math.random() * 16777215).toString(
                        16
                      )}`}
                    />
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Button size={"lg"} className={"mt-2"} variant={"default"}>
              Apply Filtration
            </Button>
          </aside>
          <div className="">
            <div className="mb-6">
              <Drawer>
                <div className="flex justify-between">
                  <div className="text-2xl md:text-3xl font-bold">Casual</div>
                  <div className="flex gap-2 items-center ">
                    <span className="text-sm md:text-lg">
                      Showing 1-10 of 100
                    </span>
                    <div className="max-sm:hidden">
                      <Select defaultValue="most">
                        <SelectTrigger className="w-45 ring-0! border-0! shadow-none">
                          <SelectValue placeholder="Most Popular" />
                        </SelectTrigger>
                        <SelectContent className="rounded-none">
                          <SelectItem className="rounded-none" value="light">
                            Most papular
                          </SelectItem>
                          <SelectItem className="rounded-none" value="dark">
                            Dark
                          </SelectItem>
                          <SelectItem className="rounded-none" value="system">
                            System
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <DrawerTrigger className="sm:hidden" asChild>
                      <Button variant="outline">
                        <HugeiconsIcon
                          icon={FilterVerticalIcon}
                          className="text-muted-foreground"
                        />
                      </Button>
                    </DrawerTrigger>
                  </div>
                </div>
                <DrawerContent className="h-[90vh]! pb-7 max-h-[90vh]! flex flex-col">
                  <ScrollArea className="mx-auto h-full w-full max-w-sm">
                    <DrawerHeader>
                      <div className="flex justify-between">
                        <DrawerTitle>
                          <span className="text-xl font-bold  pb-6">
                            Filters
                          </span>
                        </DrawerTitle>
                        <span>
                          <DrawerClose asChild>
                            <Button variant="outline">
                              {" "}
                              <HugeiconsIcon
                                icon={Close}
                                className="text-muted-foreground"
                              />
                            </Button>
                          </DrawerClose>
                        </span>
                      </div>
                    </DrawerHeader>
                    <div className="p-4 pb-0">
                      <aside className=" divide-y p-6">
                        <Accordion
                          collapsible
                          defaultValue="item-1"
                          type="single"
                          className="w-full"
                        >
                          <AccordionItem value="item-1">
                            <AccordionTrigger>
                              <span className="text-xl font-bold">
                                Categories
                              </span>
                            </AccordionTrigger>
                            <AccordionContent className="flex flex-col pt-2 gap-4 text-balance">
                              {categories.map((c) => {
                                return <span>{c.name}</span>;
                              })}
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                        <Accordion
                          collapsible
                          defaultValue="item-1"
                          type="single"
                          className="w-full"
                        >
                          <AccordionItem value="item-1">
                            <AccordionTrigger>
                              <span className="text-xl font-bold">Price</span>
                            </AccordionTrigger>
                            <AccordionContent className="flex flex-col pt-2 gap-4 text-balance">
                              <Slider
                                defaultValue={[33, 100]}
                                max={100}
                                value={[2, 50]}
                                className=""
                                step={1}
                              />
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                        <Accordion
                          collapsible
                          defaultValue="item-1"
                          type="single"
                          className="w-full"
                        >
                          <AccordionItem value="item-1">
                            <AccordionTrigger>
                              <span className="text-xl font-bold">Sizes</span>
                            </AccordionTrigger>
                            <AccordionContent className="flex  flex-wrap gap-4 text-balance">
                              {Array.from({ length: 4 }, (_, idx) => (
                                <Button
                                  variant={"outline"}
                                  className={"grow"}
                                  size={"lg"}
                                  key={idx}
                                >
                                  {
                                    ["lg", "sm", "xs", "XXL", "md"][
                                      Math.floor(Math.random() * 4)
                                    ]
                                  }
                                </Button>
                              ))}
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                        <Accordion
                          collapsible
                          defaultValue="item-1"
                          type="single"
                          className="w-full"
                        >
                          <AccordionItem value="item-1">
                            <AccordionTrigger>
                              <span className="text-xl font-bold">Sizes</span>
                            </AccordionTrigger>
                            <AccordionContent className="flex  flex-wrap gap-4 text-balance">
                              {Array.from({ length: 4 }, (_, idx) => (
                                <ColorButton
                                  key={idx}
                                  hex={`#${Math.floor(
                                    Math.random() * 16777215
                                  ).toString(16)}`}
                                />
                              ))}
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </aside>
                    </div>
                    <DrawerFooter>
                      <DrawerClose asChild>
                        <Button
                          size={"lg"}
                          className={"mt-2"}
                          variant={"default"}
                        >
                          Apply Filtration
                        </Button>
                      </DrawerClose>
                    </DrawerFooter>
                  </ScrollArea>
                </DrawerContent>
              </Drawer>
            </div>
            {children}
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </main>
    </>
  );
}
