export class ExerciseClass {
  public name: string;
  public id?: string;
  public created_at?: Date | any;
  public updated_at?: Date | any;
  public desc: string;
  public class?: {
    name: string;
    id?: string;
    updated_at?: Date | any;
    created_at?: Date | any;
  };
  public dif?: number;
  public url?: string;
  public musc_g?: {
    name: string;
    id?: string;
    updated_at?: Date | any;
    created_at?: Date | any;
  };

  constructor(isNew: boolean = false) {
    if (isNew) {
      (this.name = ''),
        (this.id = ''),
        (this.desc = ''),
        (this.class = null),
        (this.dif = 0),
        (this.url = ''),
        (this.musc_g = null);
      this.created_at = '';
      this.updated_at = '';
    }
  }
}
