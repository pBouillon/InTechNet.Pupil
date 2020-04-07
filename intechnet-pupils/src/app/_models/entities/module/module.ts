import { Tag } from './tag';

/**
 * @summary Module entity
 */
export class Module {

    /**
     * @summary module description
     */
    description: string;

    /**
     * @summary module id
     */
    id: number;

    /**
     * @summary whether this module is currently in progress for the current pupil
     */
    isOnGoing: boolean;

    /**
     * @summary module name
     */
    name: string;

    /**
     * @summary associated tags
     */
    tags: Array<Tag>;

    constructor(fields?: Partial<Module>) {
        Object.assign(this, { ...fields });
    }

}
