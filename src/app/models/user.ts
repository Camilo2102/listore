
import Company from "./company";
import CredentialModel from "./credential";
import General from "./general";

export default class User extends General{
    name: string;
    role: string;
    credential?: CredentialModel;
    company?: Company;
    active: string;
}