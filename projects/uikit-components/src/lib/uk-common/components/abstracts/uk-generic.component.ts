import { Input, HostBinding } from '@angular/core';

const uniqueId = {};

function getUniqueID(controlType: string) {
  let _uniqueID = uniqueId[controlType];
  uniqueId[controlType] = _uniqueID === undefined ? 0 : ++_uniqueID;
  return uniqueId[controlType];
}

export abstract class UkGenericComponent
{
  protected _id: string;

  constructor(public controlType: string) {
    // Needed otherwise the id is not assigned
    this.id = this.id;
  }

  @HostBinding('attr.id') @Input()
  get id(): string { return this._id; }
  set id(value: string) {
    this._id = value || `uk-${this.controlType}-${getUniqueID(this.controlType)}`;
  }
}
