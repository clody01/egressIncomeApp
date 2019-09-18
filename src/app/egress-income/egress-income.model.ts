export class EgressIncome {
  description: string;
  mount: number;
  type: string;
  uid?: string;

  constructor(obj) {
    this.description = obj && obj.description || null;
    this.mount = obj && obj.mount || null;
    this.type = obj && obj.type || null;
    this.uid = obj && obj.uid || null;
  }
}
