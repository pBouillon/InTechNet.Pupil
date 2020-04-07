import { Pupil } from '../pupil/pupil';

/**
 * @summary Hub DTO representing the backend representation of this entity
 */
export class Hub {

    /**
     * @summary hub's id
     */
    id: number;

    /**
     * @summary id of the hub's moderator
     */
    idModerator: number;

    /**
     * @summary hub's name
     */
    name: string;

    /**
     * @summary short description presenting the hub's content
     */
    description: string;

    /**
     * @summary hub shareable link
     */
    link: string;

    /**
     * @summary pupils attending this hub
     */
    attendees: Array<Pupil>;

    constructor(fields?: Partial<Hub>) {
        Object.assign(this, { ...fields });
    }

}
