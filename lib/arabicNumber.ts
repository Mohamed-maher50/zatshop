const defaultOptionValues: Record<string, Intl.NumberFormatOptions> = {
  price: {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    currency: "EGP",
    style: "currency",
  },
  number: {
    style: "decimal",
    compactDisplay: "short",
    notation: "compact",
  },
};
export const arabicNumber = (number: number, type: "price" | "number") => {
  const defaultOption = defaultOptionValues[type];
  return new Intl.NumberFormat("ar-EG", defaultOption).format(number);
};
export const arabicDate = Intl.DateTimeFormat("ar-EG", {
  day: "numeric",
  month: "short",
  year: "numeric",
});
