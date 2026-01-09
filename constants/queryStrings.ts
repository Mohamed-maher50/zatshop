export const HOME_MOST_SOLD_PRODUCT_QUERY = `?limit=8&fields=variants,title,imageCover,slug,ratingsQuantity,isFreeShipping,TotalStock,image,TotalSold,_id&sort=-TotalSold`;
export const HOME_MOST_RATING_PRODUCT_QUERY = `?limit=4&fields=variants,title,imageCover,slug,options,ratingsQuantity,isFreeShipping,TotalStock,images,TotalSold,_id&sort=-ratingsAverage`;
export const HOME_NEWEST_PRODUCT_QUERY = `?limit=8&fields=variants,images,options,title,imageCover,slug,ratingsQuantity,isFreeShipping,TotalStock,TotalSold,image,_id&sort=-createdAt`;
export const HOME_BRANDS_QUERY = `?limit=50`;
export const HOME_Category_QUERY = `?limit=50`;
