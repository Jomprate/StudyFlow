import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, Modal, Form, Input } from 'semantic-ui-react';
import './authModal.css';

interface AuthModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ open, setOpen }) => {
    const { control, handleSubmit, formState: { errors } } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            name: '',
            email: '',
            password: '',
            phoneNumber: '',
            birthDate: '',
            address: '',
            profilePicture: '',
            institutionID: '',
            profileId: '',
        }
    });

    const onSubmit = async (data: any) => {
        try {
            console.log("Form Data:", data);
            setOpen(false);
        } catch (error) {
            console.error("Validation Error:", error);
        }
    };

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            size='small'
            className="auth-modal"
        >
            <Modal.Header className="auth-modal-header">Create Account</Modal.Header>
            <Modal.Content>
                <Form onSubmit={handleSubmit(onSubmit)} className="auth-modal-form">
                    <Form.Field className="auth-modal-field">
                        <label className="auth-modal-label">Name</label>
                        <Controller
                            name="name"
                            control={control}
                            rules={{ required: "Name is required" }}
                            render={({ field }) => <Input {...field} placeholder="Name" className="auth-modal-input" />}
                        />
                        {errors.name && <p className="auth-modal-error">{errors.name.message}</p>}
                    </Form.Field>

                    <Form.Field className="auth-modal-field">
                        <label className="auth-modal-label">Email</label>
                        <Controller
                            name="email"
                            control={control}
                            rules={{
                                required: "Email is required",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Invalid email address"
                                },
                                maxLength: {
                                    value: 100,
                                    message: "Email cannot exceed 100 characters"
                                }
                            }}
                            render={({ field }) => <Input type="email" {...field} placeholder="Email" className="auth-modal-input" />}
                        />
                        {errors.email && <p className="auth-modal-error">{errors.email.message}</p>}
                    </Form.Field>

                    <Form.Field className="auth-modal-field">
                        <label className="auth-modal-label">Password</label>
                        <Controller
                            name="password"
                            control={control}
                            rules={{
                                required: "Password is required",
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,16}$/,
                                    message: "The password must be 8 to 16 characters long and contain at least one uppercase letter, one lowercase letter, and one number. Special characters are not allowed."
                                }
                            }}
                            render={({ field }) => <Input type="password" {...field} placeholder="Password" className="auth-modal-input" />}
                        />
                        {errors.password && <p className="auth-modal-error">{errors.password.message}</p>}
                    </Form.Field>

                    <Form.Field className="auth-modal-field">
                        <label className="auth-modal-label">Phone Number</label>
                        <Controller
                            name="phoneNumber"
                            control={control}
                            rules={{
                                pattern: {
                                    value: /^\d{7}(\d{3})?$/,
                                    message: "The PhoneNumber must be 7 or 10 digits."
                                }
                            }}
                            render={({ field }) => <Input {...field} placeholder="Phone Number" className="auth-modal-input" />}
                        />
                        {errors.phoneNumber && <p className="auth-modal-error">{errors.phoneNumber.message}</p>}
                    </Form.Field>

                    <Form.Field className="auth-modal-field">
                        <label className="auth-modal-label">Birth Date</label>
                        <Controller
                            name="birthDate"
                            control={control}
                            rules={{ required: "BirthDate is required" }}
                            render={({ field }) => <Input type="date" {...field} className="auth-modal-input" />}
                        />
                        {errors.birthDate && <p className="auth-modal-error">{errors.birthDate.message}</p>}
                    </Form.Field>

                    <Form.Field className="auth-modal-field">
                        <label className="auth-modal-label">Address</label>
                        <Controller
                            name="address"
                            control={control}
                            rules={{ required: "Address is required" }}
                            render={({ field }) => <Input {...field} placeholder="Address" className="auth-modal-input" />}
                        />
                        {errors.address && <p className="auth-modal-error">{errors.address.message}</p>}
                    </Form.Field>

                    <Form.Field className="auth-modal-field">
                        <label className="auth-modal-label">Profile Picture (URL)</label>
                        <Controller
                            name="profilePicture"
                            control={control}
                            rules={{
                                pattern: {
                                    value: /^(https?:\/\/.*\.(?:png|jpg))$/,
                                    message: "Invalid URL for Profile Picture"
                                }
                            }}
                            render={({ field }) => <Input {...field} placeholder="Profile Picture URL" className="auth-modal-input" />}
                        />
                        {errors.profilePicture && <p className="auth-modal-error">{errors.profilePicture.message}</p>}
                    </Form.Field>

                    <Form.Field className="auth-modal-field">
                        <label className="auth-modal-label">Institution ID</label>
                        <Controller
                            name="institutionID"
                            control={control}
                            rules={{
                                required: "InstitutionID is required",
                                setValueAs: (v) => v === '' ? undefined : parseInt(v, 10) // Convierte el valor a número
                            }}
                            render={({ field }) => <Input type="number" {...field} placeholder="Institution ID" className="auth-modal-input" />}
                        />
                        {errors.institutionID && <p className="auth-modal-error">{errors.institutionID.message}</p>}
                    </Form.Field>

                    <Form.Field className="auth-modal-field">
                        <label className="auth-modal-label">Profile ID</label>
                        <Controller
                            name="profileId"
                            control={control}
                            rules={{
                                required: "ProfileId is required",
                                setValueAs: (v) => v === '' ? undefined : parseInt(v, 10) // Convierte el valor a número
                            }}
                            render={({ field }) => <Input type="number" {...field} placeholder="Profile ID" className="auth-modal-input" />}
                        />
                        {errors.profileId && <p className="auth-modal-error">{errors.profileId.message}</p>}
                    </Form.Field>

                    <Button type="submit" positive className="auth-modal-submit">
                        Create Account
                    </Button>
                </Form>
            </Modal.Content>
        </Modal>
    );
};

export default AuthModal;