import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const bulanToAngka = (bulan) => {
  if (!bulan) {
    return null; // atau nilai default jika diperlukan
  }

  const bulanLowerCase = bulan.toLowerCase();
  switch (bulanLowerCase) {
    case 'januari':
      return 1;
    case 'februari':
      return 2;
    case 'maret':
      return 3;
    case 'april':
      return 4;
    case 'mei':
      return 5;
    case 'juni':
      return 6;
    case 'juli':
      return 7;
    case 'agustus':
      return 8;
    case 'september':
      return 9;
    case 'oktober':
      return 10;
    case 'november':
      return 11;
    case 'desember':
      return 12;
    default:
      return null;
  }
};
;