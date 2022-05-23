export default function CategoryView({ category, onClose }) {
  const handleCloseClick = () => {
    onClose();
  };

  return (
    <div className="flex flex-col md:flex-1 w-full">
      <div className="md:flex-1">
        <h2 className="mb-2 leading-tight tracking-tight font-bold text-primary text-2xl md:text-3xl">
          {category.title}
        </h2>
        <p className="text-gray-500">{category.description}</p>
      </div>
    </div>
  );
}
