// components/ProductCell.tsx
import Image from 'next/image';

interface ProductCellProps {
  imageUrl?: string;
  productName: string;
}

const ProductCell: React.FC<ProductCellProps> = ({ imageUrl, productName }) => (
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <Image
      src={imageUrl || '/placeholder.png'} // Replace with a real placeholder URL or path
      alt={productName}
      width={50} // Adjust width and height as needed
      height={50}
      style={{ marginRight: '10px', borderRadius: '5px' }}
    />
    <span>{productName}</span>
  </div>
);

export default ProductCell;
