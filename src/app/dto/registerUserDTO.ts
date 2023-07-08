import Company from "@/models/company";
import CredentialModel from "@/models/credential";
import User from "@/models/user";

export default class RegisterUserDTO {
        credential: CredentialModel;
        user: User;
        company: Company;
}
