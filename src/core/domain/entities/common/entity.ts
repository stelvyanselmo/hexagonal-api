import { randomUUID } from "crypto";

//@core bussiness common shared properties
export default abstract class Entity<T> {

    protected _id: string;
    public props: T;

    constructor(props: T, id?: string) {

        this._id = id ?? randomUUID();
        this.props = props;

    }

    public get id(): string {

        return this._id

    }

}