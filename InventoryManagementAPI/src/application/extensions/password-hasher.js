import argon2 from 'argon2';

export async function hasher(clearTextPassword) {
    try {
        const hash = await argon2.hash(clearTextPassword);
        return hash;
    } catch (err) {
        console.log(err);
    }
}

export async function verifyPassword(hashedPassword, clearTextPassword) {
    try {
        const hash = await argon2.verify(hashedPassword, clearTextPassword);
        return (hash == 1 ? true : false);
    } catch (err) {
        console.log(err);
    }
}