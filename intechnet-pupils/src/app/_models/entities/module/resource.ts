/**
 * @summary Resource dto for the current module
 */
export class Resource {

    /**
     * @summary resource id
     */
    id: number;

    /**
     * @summary resource content
     */
    content: string;

    constructor(fields?: Partial<Resource>) {
        Object.assign(this, { ...fields });
    }

 }
