const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
    } catch (error) {
        console.error('❤️Error al conectar a la base de datos:', error.message);
        process.exit(1);
    }
};

mongoose.connection.on('error', (error) => {
    console.error('❤️Error en la conexión a la base de datos:', error.message);
});

mongoose.connection.on('connected', () => {
    console.log('💚 Conexión a la base de datos establecida correctamente');
});

process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('❤️Conexión a la base de datos cerrada');
    process.exit(0);
});

module.exports = connectDB;