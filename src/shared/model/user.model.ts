import { format } from "date-fns";

import { DATE_TIME_FORMAT } from "../utils/global.utils";
import { GenericNameDescriptionModel } from "./genericNameDescription.model";

export class UserModel extends GenericNameDescriptionModel {
  nni: string;
  familyName: string;
  givenName: string;
  email: string;
  isActive: boolean;
  lastSuccessfulLogin: string;
  lastFailedLogin: string;
  lastModifyPassword: string;
  fullName: string;

  constructor(
    nni: string,
    familyName: string,
    givenName: string,
    email: string,
    isActive: boolean,
    oid: string,
    fullName?: string,
  ) {
    super(oid, familyName, null);
    this.nni = nni;
    this.familyName = familyName;
    this.givenName = givenName;
    this.email = email;
    this.isActive = isActive;
    this.lastSuccessfulLogin = this.formatDate("");
    this.lastFailedLogin = this.formatDate("");
    this.lastModifyPassword = this.formatDate("");
    this.fullName = fullName ?? this.getFullName();
    this.deleted = false;
  }

  formatDate(date) {
    if (date) {
      return format(new Date(date), DATE_TIME_FORMAT);
    }
    return format(new Date(), DATE_TIME_FORMAT);
  }

  getFullName() {
    return `${this.familyName} ${this.givenName}`;
  }
}
