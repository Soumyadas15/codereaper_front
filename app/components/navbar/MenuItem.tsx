'use client';

interface MenuItemProps {
  onClick: () => void;
  label: string;
}

const MenuItem: React.FC<MenuItemProps> = ({
  onClick,
  label
}) => {
  return ( 
    <div 
      onClick={onClick} 
      className="
        px-4 
        py-3 
        hover:bg-purple-800
        dark:hover:bg-purple-800
        transition
        font-semibold
        text-black
        dark:text-white
      "
    >
      {label}
    </div>
   );
}
 
export default MenuItem;