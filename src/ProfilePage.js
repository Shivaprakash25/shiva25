import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import './ProfilePage.css'; // Ensure the CSS file exists and has relevant styles.

const ProfilePage = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        avatar: '/IMG_3436.jpg', // Assuming the avatar.png is in the public folder.
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate an API call to fetch user data.
        setTimeout(() => {
            try {
                setUser({
                    name: 'SHIVAPRAKASH',
                    email: 'shiva@example.com',
                    avatar: '/IMG_3436.jpg', // Replace with a real avatar URL if available.
                });
                setLoading(false);
            } catch (err) {
                setError('Failed to load user data.');
                setLoading(false);
            }
        }, 1000);
    }, []);

    const handleSubmit = (values, { setSubmitting }) => {
        // Simulate API call to update user information.
        setTimeout(() => {
            setUser({
                ...user,
                name: values.name,
                email: values.email,
            });
            setSubmitting(false);
        }, 500);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="profile-page">
            <h1>Profile Page</h1>
            <div className="profile-info">
                {/* Avatar Section */}
                <div className="avatar">
                    {user.avatar ? (
                        <img src={user.avatar} alt="Avatar" />
                    ) : (
                        <div className="avatar-placeholder">
                            {user.name ? user.name[0] : 'U'}
                        </div>
                    )}
                </div>

                <h2>{user.name || 'Your Name'}</h2>
                <p>{user.email || 'Your Email'}</p>

                {/* Form to update user information */}
                <Formik
                    initialValues={{ name: user.name, email: user.email }}
                    enableReinitialize // Ensures form updates with new user data.
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <div>
                                <label htmlFor="name">Name</label>
                                <Field
                                    id="name"
                                    name="name"
                                    placeholder="Enter your name"
                                />
                            </div>
                            <div>
                                <label htmlFor="email">Email</label>
                                <Field
                                    id="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    type="email"
                                />
                            </div>
                            <button type="submit" disabled={isSubmitting}>
                                Update
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default ProfilePage;
