import CredentialModel from "@/models/credential";
import User from "@/models/user";

export default class RegisterWorkerDTO {
    user: User;
    credential: CredentialModel;
    companyID: string ;
}