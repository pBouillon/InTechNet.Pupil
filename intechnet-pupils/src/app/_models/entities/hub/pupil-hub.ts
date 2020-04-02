import { Pupil } from '../pupil/pupil';

/**
 * @summary Pupil hub DTO representing the backend representation of this entity
 */
export class PupilHub {

    /**
     * @summary hub's id
     */
    id: number;

    /**
     * @summary short description presenting the hub's content
     */
    description: string;

    /**
     * @summary hub shareable link
     */
    link: string;

    /**
     * @summary hub's name
     */
    name: string;

    /**
     * @summary nickname of the moderator's hub
     */
    moderatorNickname: string;

    constructor(fields?: Partial<PupilHub>) {
        Object.assign(this, { ...fields });
    }
}
