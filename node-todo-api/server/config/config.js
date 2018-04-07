const env = process.env.NODE_ENV || 'development';

if(env !== 'production'){
  process.env.PORT = 3000;
}