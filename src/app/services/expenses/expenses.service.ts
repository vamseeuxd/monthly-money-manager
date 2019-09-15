import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { IExpenses } from 'src/app/models/expenses';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ExpensesService {

  private expenssesRef: AngularFireList<any>;
  private expenssesList: IExpenses[] = [];
  private expenssesListFireBase: Observable<IExpenses[]>;
  public expenssesList$: Subject<IExpenses[]> = new Subject<IExpenses[]>();

  constructor(db: AngularFireDatabase) {

    this.expenssesRef = db.list('expensses');

    this.expenssesListFireBase = this.expenssesRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );

    this.expenssesListFireBase.subscribe((expenssesList: IExpenses[]) => {
      this.expenssesList = expenssesList;
      this.init();
    });
  }

  public init() {
    this.expenssesList$.next(this.expenssesList);
  }

  public add(expenses: IExpenses) {
    expenses.userEmail = 'vamsi.flex@gmail.com';
    this.expenssesRef.push(expenses);
  }

  public update(key: string, expenses: IExpenses): Promise<void> {
    delete expenses.key;
    return this.expenssesRef.update(key, { ...expenses });
  }

  public remove(key: string): Promise<void> {
    return this.expenssesRef.remove(key);
  }
}
