import orm from 'final-orm';

const options = {
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASS
};

let {Model, Edge} = orm.connect(options);

export default Model;

export { Model, Edge }