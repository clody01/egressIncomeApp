import {Pipe, PipeTransform} from '@angular/core';
import {EgressIncome} from './egress-income.model';

@Pipe({
  name: 'orderEgressIncome'
})
export class OrderEgressIncomePipe implements PipeTransform {

  transform(items: EgressIncome[]): EgressIncome[] {
    return items.sort((a, b) => {
      if (a.type === 'income') {
        return -1;
      } else {
        return 1;
      }
    });
  }

}
