export interface IExpenses {
    isImportant: boolean;
    name: string;
    key?: string;
    dueDate?: string;
    repeat?: string;
    noOfrepeat?: number;
    type?: string;
    subType?: string;
    amount: number;
    done: boolean;
    userEmail?: string;
}