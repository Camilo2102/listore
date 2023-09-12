import CredentialModel from "@/app/models/credential";
import User from "@/app/models/user";

export default class RegisterWorkerDTO {
    user: User;
    credential: CredentialModel;
    companyID: string ;
}