import { Pipe, PipeTransform } from '@angular/core';
import { isNullOrUndefined } from 'util';

@Pipe({
  name: 'objectSort'
})
export class ObjectSortPipe implements PipeTransform {

  transform(petitions, sort = 'every') {
    if (!isNullOrUndefined(petitions) && ((sort).trim()) !== "") {
      if (sort == 'every') {
        return petitions;
      }
      if (sort == 'dvor') {
        let petition = petitions.filter(
          petitions => petitions.id_object === 1
        );
        return petition;
      }
      else if (sort == 'houses') {
        let petition = petitions.filter(
          petitions => petitions.id_object === 2
        );
        return petition;
      }
      else if (sort == 'rode') {
        let petition = petitions.filter(
          petitions => petitions.id_object === 3
        );
        return petition;
      }
      else if (sort == 'policlinik') {
        let petition = petitions.filter(
          petitions => petitions.id_object === 4
        );
        return petition;
      }

            else if (sort == 'park') {
        let petition = petitions.filter(
          petitions => petitions.id_object === 5
        );
        return petition;
      }

            else if (sort == 'cafe') {
        let petition = petitions.filter(
          petitions => petitions.id_object === 6
        );
        return petition;
      }

                  else if (sort == 'schools') {
        let petition = petitions.filter(
          petitions => petitions.id_object === 7
        );
        return petition;
      }

                        else if (sort == 'torg') {
        let petition = petitions.filter(
          petitions => petitions.id_object === 8
        );
        return petition;
      }

    }
  }
}