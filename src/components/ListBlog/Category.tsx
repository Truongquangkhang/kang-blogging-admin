import { useNavigate } from 'react-router-dom';
import { ICategory } from '../../interfaces/model/category';

interface Prods {
  category: ICategory;
}

export const Category = ({ category }: Prods) => {
  const navigate = useNavigate();
  return (
    <div>
      <a
        onClick={() => {
          navigate(
            `/category/${category.id}?n=${category.name}&t=${category.blogCount}`,
          );
        }}
        key={category.id}
        className="h-full bg-blue-100 hover:bg-blue-200 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-white dark:text-blue-400 border border-blue-400 inline-flex items-center justify-center mb-2
        cursor-pointer"
      >
        {category.name}
      </a>
    </div>
  );
};
