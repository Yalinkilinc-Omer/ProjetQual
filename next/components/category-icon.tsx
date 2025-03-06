import {
  Smartphone,
  Dumbbell,
  BookOpen,
  Music,
  Utensils,
  Sofa,
  Shirt,
  Gamepad2,
  Wrench,
  Palette,
  Flower2,
  Package,
  type LucideIcon,
} from "lucide-react"

type CategoryIconProps = {
  category: string
  className?: string
}

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
    other: Package,
  }

  const IconComponent = iconMap[category] || Package

  return <IconComponent className={className} />
}

