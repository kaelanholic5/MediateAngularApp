import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filterPeople'
})
export class SearchPeople implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if(!items) return [];
    if(!searchText) return items;
searchText = searchText.toLowerCase();
return items.filter( it => {
      return it.personName.toLowerCase().includes(searchText);
    });
   }
}