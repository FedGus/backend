import { Pipe, PipeTransform } from '@angular/core';
import { isNullOrUndefined } from 'util';

@Pipe({
  name: 'categorySort'
})
export class CategorySortPipe implements PipeTransform {

transform(petitions: any,category:any): any {
        if(category.every){
            return petitions;
        }

        return petitions.filter(petition => 
                                (category.remont && petition.id_category==1) 
                                || (category.blago && petition.id_category==2)
          || (category.ozelenenie && petition.id_category == 3)
        || (category.osvet && petition.id_category==4))
    }
}