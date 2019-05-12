import { Model, Edge } from "./model";

class Artist extends Model {
    static schema = {
        name: String,
        country: String,
        gender: {
            $type: String,
            enum: ['male', 'female'],
            optional: true
        }

    }
}

export default Artist;