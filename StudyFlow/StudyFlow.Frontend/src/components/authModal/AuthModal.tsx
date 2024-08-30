import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button, Modal, Form, Input } from 'semantic-ui-react';
import './authModal.css';

interface AuthModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email address").max(100).required("Email is required"),
    password: yup.string()
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,16}$/,
            "The password must be 8 to 16 characters long and contain at least one uppercase letter, one lowercase letter, and one number. Special characters are not allowed.")
        .required("Password is required"),
    phoneNumber: yup.string().matches(/^\d{7}(\d{3})?$/, "The PhoneNumber must be 7 or 10 digits."),
    birthDate: yup.date().required("BirthDate is required"),
    address: yup.string().required("Address is required"),
    profilePicture: yup.string().url("Invalid URL for Profile Picture"),
    institutionID: yup.number().required("InstitutionID is required"),
    profileId: yup.number().required("ProfileId is required")
});

const AuthModal: React.FC<AuthModalProps> = ({ open, setOpen }) => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data: any) => {
        try {
            setErrorMessage(null);
            // eslint-disable-next-line no-console
            console.log("Form Data:", data);
            setOpen(false);
        } catch (error) {
            console.error("Validation Error:", error); //
            setErrorMessage("There was an issue creating your account. Please try again.");
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
                {errorMessage && (
                    <div className="auth-modal-error-message">
                        {errorMessage}
                    </div>
                )}
                <Form onSubmit={handleSubmit(onSubmit)} className="auth-modal-form">
                    <Form.Field className="auth-modal-field">
                        <label className="auth-modal-label">Name</label>
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => <Input {...field} placeholder="Name" className="auth-modal-input" />}
                        />
                        {errors.name && <p className="auth-modal-error">{errors.name.message}</p>}
                    </Form.Field>

                    <Form.Field className="auth-modal-field">
                        <label className="auth-modal-label">Email</label>
                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => <Input type="email" {...field} placeholder="Email" className="auth-modal-input" />}
                        />
                        {errors.email && <p className="auth-modal-error">{errors.email.message}</p>}
                    </Form.Field>

                    <Form.Field className="auth-modal-field">
                        <label className="auth-modal-label">Password</label>
                        <Controller
                            name="password"
                            control={control}
                            render={({ field }) => <Input type="password" {...field} placeholder="Password" className="auth-modal-input" />}
                        />
                        {errors.password && <p className="auth-modal-error">{errors.password.message}</p>}
                    </Form.Field>

                    <Form.Field className="auth-modal-field">
                        <label className="auth-modal-label">Phone Number</label>
                        <Controller
                            name="phoneNumber"
                            control={control}
                            render={({ field }) => <Input {...field} placeholder="Phone Number" className="auth-modal-input" />}
                        />
                        {errors.phoneNumber && <p className="auth-modal-error">{errors.phoneNumber.message}</p>}
                    </Form.Field>

                    <Form.Field className="auth-modal-field">
                        <label className="auth-modal-label">Birth Date</label>
                        <Controller
                            name="birthDate"
                            control={control}
                            render={({ field }) => <Input type="date" {...field} className="auth-modal-input" />}
                        />
                        {errors.birthDate && <p className="auth-modal-error">{errors.birthDate.message}</p>}
                    </Form.Field>

                    <Form.Field className="auth-modal-field">
                        <label className="auth-modal-label">Address</label>
                        <Controller
                            name="address"
                            control={control}
                            render={({ field }) => <Input {...field} placeholder="Address" className="auth-modal-input" />}
                        />
                        {errors.address && <p className="auth-modal-error">{errors.address.message}</p>}
                    </Form.Field>

                    <Form.Field className="auth-modal-field">
                        <label className="auth-modal-label">Profile Picture (URL)</label>
                        <Controller
                            name="profilePicture"
                            control={control}
                            render={({ field }) => <Input {...field} placeholder="Profile Picture URL" className="auth-modal-input" />}
                        />
                        {errors.profilePicture && <p className="auth-modal-error">{errors.profilePicture.message}</p>}
                    </Form.Field>

                    <Form.Field className="auth-modal-field">
                        <label className="auth-modal-label">Institution ID</label>
                        <Controller
                            name="institutionID"
                            control={control}
                            render={({ field }) => <Input type="number" {...field} placeholder="Institution ID" className="auth-modal-input" />}
                        />
                        {errors.institutionID && <p className="auth-modal-error">{errors.institutionID.message}</p>}
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