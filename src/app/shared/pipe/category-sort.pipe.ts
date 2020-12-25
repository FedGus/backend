import { Pipe, PipeTransform } from '@angular/core';
import { isNullOrUndefined } from 'util';

@Pipe({
  name: 'categorySort'
})
export class CategorySortPipe implements PipeTransform {

  transform(petitions, sort = 'every') {
    if (!isNullOrUndefined(petitions) && ((sort).trim()) !== "") {
      if (sort == 'every') {
        return petitions;
      }
      if (sort == 'remont') {
        let petition = petitions.filter(
          petitions => petitions.id_category === 1
        );
        return petition;
      }
      else if (sort == 'blago') {
        let petition = petitions.filter(
          petitions => petitions.id_category === 2
        );
        return petition;
      }
      else if (sort == 'ozelenenie') {
        let petition = petitions.filter(
          petitions => petitions.id_category === 3
        );
        return petition;
      }
      else if (sort == 'osvet') {
        let petition = petitions.filter(
          petitions => petitions.id_category === 4
        );
        return petition;
      }

    }
  }
}