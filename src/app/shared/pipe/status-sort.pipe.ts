import { Pipe, PipeTransform } from '@angular/core';
import { isNullOrUndefined } from 'util';
@Pipe({
  name: 'statusSort'
})
export class StatusSortPipe implements PipeTransform {

   transform(petitions, sort = 'every') {
    if (!isNullOrUndefined(petitions) && ((sort).trim()) !== "") {
      if (sort == 'every') {
        return petitions;
      }
      if (sort == 'active') {
        let petition = petitions.filter(
          petitions => petitions.id_status === 1
        );
        return petition;
      }
      else if (sort == 'progress') {
        let petition = petitions.filter(
          petitions => petitions.id_status === 2
        );
        return petition;
      }
      else if (sort == 'stop') {
        let petition = petitions.filter(
          petitions => petitions.id_status === 3
        );
        return petition;
      }
      else if (sort == 'end') {
        let petition = petitions.filter(
          petitions => petitions.id_status === 4
        );
        return petition;
      }

            else if (sort == 'passive') {
        let petition = petitions.filter(
          petitions => petitions.id_status === 5
        );
        return petition;
      }

    }
  }
}
