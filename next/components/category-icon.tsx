import { Smartphone, Dumbbell, BookOpen, Music, Utensils, Sofa, Shirt, Gamepad2, Wrench, Palette, Flower2, Package, TypeIcon as type, LucideIcon } from 'lucide-react';

type CategoryIconProps = {
  category: string;
  className?: string;
};

export function CategoryIcon({ category, className = "" }: CategoryIconProps) {
  const iconMap: Record<string, LucideIcon> = {
    electronics: Smartphone,
    sports: Dumbbell,
    books: BookOpen,
    music: Music,
    kitchen: Utensils,
    furniture: Sofa,
    clothing: Shirt,
    toys: Gamepad2,
    tools: Wrench,
    art: Palette,
    garden: Flower2,
    other: Package
  };

  // Try to match the category name (case insensitive)
  const normalizedCategory = category.toLowerCase().replace(/[^a-z0-9]/g, '');

  // Look for partial matches if exact match isn't found
  const matchedKey = Object.keys(iconMap).find(key =>
    normalizedCategory.includes(key) || key.includes(normalizedCategory)
  );

  const IconComponent = matchedKey ? iconMap[matchedKey] : Package;

  return <IconComponent className={className} />;
}
