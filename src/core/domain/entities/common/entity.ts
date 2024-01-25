import { randomUUID } from "crypto";

//@core business entities common shared properties
export default abstract class Entity<T> {

    protected id: string;
    public props: T;

    constructor(props: T, id?: string) {

        this.id = id ?? randomUUID();
        this.props = props;

    }

    public get _id(): string {

        return this._id

    }

}