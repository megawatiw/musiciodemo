import { Model, Edge } from "./model";

class User extends Model {
    static schema = {
        username: String,
        password: String,
        gender: {
            $type: String,
            enum: ['male', 'female'],
            optional: true
        }

    };
}

export default User;