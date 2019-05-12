import axios from 'axios';

const devConfig = axios.create({

});

const prodConfig = axios.create({

});

const http = (process.env.NODE_ENV === 'production') ? prodConfig : devConfig;


export default http;
