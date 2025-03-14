const { User } = require('./models');

const hashAndUpdatePassword = async () => {
    const email = 'admin@test.com'; // Remplace par l'email de ton admin
    await User.update(
        { password: "adminpassword" },
        { where: { email } }
    );
    console.log('Mot de passe mis à jour avec succès !');
};

hashAndUpdatePassword();