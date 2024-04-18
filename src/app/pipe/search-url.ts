import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filterWebsite'
})
export class SearchUrl implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if(!items) return [];
    if(!searchText) return items;
searchText = searchText.toLowerCase();
return items.filter( it => {
      return it.url.toLowerCase().includes(searchText);
    });
   }
}