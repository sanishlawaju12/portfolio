import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const addPaddingToList = (htmlText: string): string => {
  return htmlText
    // Add padding to <ul> and <ol>
    .replace(/<ul>/g, '<ul class="pl-8 list-disc">')
    .replace(/<ol>/g, '<ol class="pl-8 list-decimal">')

    // Add spacing to <p> that contain <span>
    .replace(/<p>(.*?)<span(.*?)<\/span>(.*?)<\/p>/g, '<p class="pt-5">$1<span$2</span>$3</p>')

    // Style <h4>
    .replace(/<h4>/g, '<h4 class="pt-6 font-semibold text-lg">')

    // Style <table> and related elements
    .replace(/<figure class="table">/g, '<div class="overflow-x-auto my-6"><figure class="table w-full">')
    .replace(/<\/figure>/g, '</figure></div>')
    .replace(/<table>/g, '<table class="table-auto w-full border border-collapse border-gray-300 text-sm">')
    .replace(/<th>/g, '<th class="border px-4 py-2 bg-gray-100 font-medium text-left">')
    .replace(/<td>/g, '<td class="border px-4 py-2">')
    .replace(/<img src="\/(.*?)"/g,
  `<img src="${process.env.BASE_URL}/$1"`);
};
