import General from "./general";

export default class CredentialModel extends General{
    mail: string;
    password: string | null;
    userName: string;
}