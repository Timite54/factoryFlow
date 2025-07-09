import mongoose from 'mongoose';

const dbConnexion = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("✅ Connexion à la bd établie avec succès.");
    }catch (e) {
        console.error("❌ Erreur lors de la connexion a la bd:", e.message)
    }
}
export default dbConnexion;