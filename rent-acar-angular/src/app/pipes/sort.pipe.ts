import { Pipe, PipeTransform } from '@angular/core';
import { Automobil } from '../models/automobili.model';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(value: Array<any>, args: any[]): any[] {
    const sortField = args[0];
    const sortDirection = args[1];
    console.log(sortField, sortDirection);
    
  let multiplier = 1;
  if(sortDirection === 'desc'){
    multiplier = -1;
  }

    value.sort((a: any, b: any) => {
      if(a[sortField] < b[sortField]){
        return -1 * multiplier;
      } else if(a[sortField] > b[sortField]){
        return 1 * multiplier;
      }
        return 0;
    });

    return value;

    /*return value.sort((a, b) => {
      if (sortDirection === "asc") {
        return a[sortField] - b[sortField];
      } else if (sortDirection === "desc") {
        return b[sortField] - a[sortField];
      }
      return 0;
    });*/
  }

}
