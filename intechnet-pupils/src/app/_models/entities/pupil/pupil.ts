/**
 * @summary Pupil DTO representing the backend representation of this entity
 */
export class Pupil {

    /**
     * @summary pupil's mail
     */
    email: string;

    /**
     * @summary pupil's id
     */
    id: number;

    /**
     * @summary pupil's nickname
     */
    nickname: string;

    /**
     * @summary current pupil's JWT
     */
    token: string;

    constructor(fields?: Partial<Pupil>) {
        Object.assign(this, {...fields});
    }

}
