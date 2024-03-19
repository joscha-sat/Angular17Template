/**
 * abstract BaseModel class that will be extended by the other models
 */
export abstract class BaseModel<Model extends BaseModel<Model>> {
  protected constructor(object: Partial<Model>) {
    Object.assign(this, object);
  }

  private _id!: string;

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }


  // abstract toJSON(): any;
  // abstract fromJSON(json: any): any;

  private _createdAt!: Date;

  get createdAt(): Date {
    return this._createdAt;
  }

  set createdAt(value: Date) {
    this._createdAt = value;
  }

  private _updatedAt!: Date;

  get updatedAt(): Date {
    return this._updatedAt;
  }

  set updatedAt(value: Date) {
    this._updatedAt = value;
  }
}
