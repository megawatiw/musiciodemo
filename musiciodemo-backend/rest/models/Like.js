import { Model, Edge } from "./model";
import User from "./User";
import Artist from "./Artist";

class Like extends Edge {
    static schema = {
        user: User,
        artist: Artist,
        date: Date
    }
}