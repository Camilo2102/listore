import Company from "@/app/models/company";
import CredentialModel from "@/app/models/credential";
import User from "@/app/models/user";

export default class RegisterUserDTO {
        credential: CredentialModel;
        user: User;
        company: Company;
}
