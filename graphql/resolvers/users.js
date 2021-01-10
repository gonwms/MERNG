const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../../models/User');
const { SECRET_KEY } = require('../../config')

function generateToken(user) {
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            username: user.username
        },
        SECRET_KEY,
        { expiresIn: '1h' }
    );
}

module.exports = {
    Mutation: {
        async register(
            _,
            {
                RegisterInput: { email, username,  password, confirmPassword }
            }
        ) {
            // Validate user data
            // hash password and create an auth token
            password = await bcrypt.hash(password, 12);

            const newUser = new User({
                email,
                username,
                password,
                createdAt: new Date().toISOString()
            });

            const res = await newUser.save();

            const token = generateToken(res);

            return {
                ...res._doc,
                id: res._id,
                token
            };
        }
    }
};