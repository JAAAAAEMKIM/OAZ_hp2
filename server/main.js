import express from 'express';
import path from 'path';
import morgan from 'morgan'; // HTTP REQUEST LOGGER
import bodyParser from 'body-parser'; // PARSE HTML BODY
import mongoose from 'mongoose'; // mongodb data 모델링 툴. 몽고디비 데이터를 JS객체로 사용할 수 있게 해줌.
import session from 'express-session'; // express에서 세션을 다룰 때 사용
import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';

const app = express();
const port = 3000;
const devPort = 4000;

app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, './../public')));

app.get('/hello', (req, res) => {
    return res.send('Hello CodeLab');
});

app.listen(port, () => {
    console.log('Express is listening on port', port);
});

// npm run development 하면 여기서 development서버를 켜게 된다.
if(process.env.NODE_ENV == 'development') { 
    console.log('Server is running on development mode');
    const config = require('../webpack.dev.config');
    const compiler = webpack(config);
    const devServer = new WebpackDevServer(compiler, config.devServer);
    devServer.listen(
        devPort, () => {
            console.log('webpack-dev-server is listening on port', devPort);
        }
    );
}

/* mongodb connection */
const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => { console.log('Connected to mongodb server'); });
// mongoose.connect('mongodb://username:password@host:port/database=');
mongoose.connect('mongodb://localhost/codelab');

/* use session */
app.use(session({
    secret: 'CodeLab1$1$234',
    resave: false,
    saveUninitialized: true
}));

/* setup routers & static directory */
import api from './routes'; // ./routes 를 api라는 이름으로 지정.
app.use('/api', api); // '/api'를 받으면 ./routes 안에 있는 라우터를 사용할 수 있게 된다.

/* handle error */
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

  /* ... 코드 생략 ... */
app.use('/api', api);
/* ... 주의: API 하단부에 작성하세요 ... */

/* support client-side routing */
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './../public/index.html'));
});