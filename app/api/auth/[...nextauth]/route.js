/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import ConnectToDb from '@/utils/database';
import User from '@/models/userSchema';

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
            authorization: {
                params: {
                    scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
                },
            },
        }),
    ],
    callbacks: {
        async session({ session }) {
            try {
                const sessionUser = await User.findOne({ email: session.user.email });
                if (sessionUser) {
                    session.user.id = sessionUser._id.toString();
                    session.user.image = sessionUser.image; // Include image in the session if needed
                } else {
                    console.error('User not found in database.');
                }
                return session;
            } catch (error) {
                console.error('Session callback error:', error);
                return session; // Prevent breaking the flow
            }
        },
        async signIn({ profile,user }) {
            try {
                await ConnectToDb();
                const userExist = await User.findOne({ email: profile?.email });

                if (!userExist) {
                    await User.create({
                        email: profile?.email,
                        username: profile?.name.replace(" ", "").toLowerCase(),
                        image: profile?.picture // Save the profile picture
                    });
                    console.log(user)
                }

                return true;
            } catch (error) {
                console.error('Sign-in callback error:', error);
                return false; // Handle the error appropriately
            }
        }
    }
});

export { handler as GET, handler as POST };
