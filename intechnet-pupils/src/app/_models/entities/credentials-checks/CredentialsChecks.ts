
/**
 * @summary Dto for credentials duplication checks
 */
export class CredentialsChecks {

    /**
     * @summary true if both other attributes are unique in the database
     */
    areUnique: boolean;

    /**
     * @summary email to be checked for duplicates
     */
    email: string;

    /**
     * @summary nickname to be checked for duplicates
     */
    nickname: string;

    constructor(fields?: Partial<CredentialsChecks>) {
        Object.assign(this, { ...fields });
    }

}
