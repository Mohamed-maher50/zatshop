async function ProductPage({
  params,
}: {
  params: Promise<{ productId: string; slug: string }>;
}) {
  const { slug, productId } = await params;
  console.log(params);
  return (
    <div>
      {slug}
      id:{productId}
    </div>
  );
}

export default ProductPage;
