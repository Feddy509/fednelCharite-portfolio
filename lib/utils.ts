import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * ==============================================================================
 * FR: Utilitaires de Manipulation de Classes CSS (Tailwind Merge)
 * EN: CSS Class Manipulation Utilities (Tailwind Merge)
 * ==============================================================================
 * 
 * FR: Fusionne les noms de classes conditionnelles et résout automatiquement
 *     les conflits de spécificité Tailwind CSS.
 * EN: Merges conditional class names and resolves Tailwind CSS conflict overrides.
 * 
 * @param inputs FR: Liste des classes CSS ou expressions / EN: List of class names or conditions
 * @returns FR: Chaîne de classes optimisée / EN: Optimized class string
 * 
 * @example
 * // FR: Exemple d'utilisation / EN: Usage example:
 * cn("px-2 py-1", isActive && "bg-accent-600", className)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}