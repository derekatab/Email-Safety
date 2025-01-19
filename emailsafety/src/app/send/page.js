// "use client";
// import React from 'react';
// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { auth } from '../../../firebase/clientApp';
// import { onAuthStateChanged, signOut } from 'firebase/auth';
// import sendTestEmail from '../api/sendEmail';
// // main home page + sign out

// export default function Dashboard() {
//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const router = useRouter();

//     useEffect(() => {
//         const unsubscribe = onAuthStateChanged(auth, (user) => {
//             if (user) {
//                 setUser(user);
//                 setLoading(false);
//             } else {
//                 router.push('/auth');
//             }
//         });

//         return () => unsubscribe();
//     }, [router]);

//     const handleSignOut = async () => {
//         await signOut(auth);
//         router.push('/auth');
//     }

//     const handleSendEmail = async () => {
//         try {
//             const result = await sendTestEmail();
//             console.log('Email sent successfully:', result);
//         } catch (error) {
//             console.error('Error sending email:', error);
//         }
//     };


//     if (loading) {
//         return <p>Loading...</p>;
//     }

//     return (
//         <div>
//             <h1>Your Tests</h1>
//             <p>Welcome back, {user.displayName || 'User'}!</p>
//             <button onClick={handleSendEmail}>Send Test Email</button>

//             <button onClick={handleSignOut}>Sign Out</button>
//         </div >
//     );
// }

