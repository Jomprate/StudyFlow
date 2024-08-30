import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, Modal, Form, Input } from 'semantic-ui-react';
import './loginModal.css';

interface LoginModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ open, setOpen }) => {
    const { control, handleSubmit, formState: { errors } } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            email: '',
            password: ''
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
            className="login-modal"
        >
            <Modal.Header className="login-modal-header">Login</Modal.Header>
            <Modal.Content>
                <Form onSubmit={handleSubmit(onSubmit)} className="login-modal-form">
                    <Form.Field className="login-modal-field">
                        <label className="login-modal-label">Email</label>
                        <Controller
                            name="email"
                            control={control}
                            rules={{
                                required: "Email is required",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Invalid email address"
                                }
                            }}
                            render={({ field }) => <Input type="email" {...field} placeholder="Email" className="login-modal-input" />}
                        />
                        {errors.email && <p className="login-modal-error">{errors.email.message}</p>}
                    </Form.Field>

                    <Form.Field className="login-modal-field">
                        <label className="login-modal-label">Password</label>
                        <Controller
                            name="password"
                            control={control}
                            rules={{ required: "Password is required" }}
                            render={({ field }) => <Input type="password" {...field} placeholder="Password" className="login-modal-input" />}
                        />
                        {errors.password && <p className="login-modal-error">{errors.password.message}</p>}
                    </Form.Field>

                    <Button type="submit" positive className="login-modal-submit">
                        Login
                    </Button>
                </Form>
            </Modal.Content>
        </Modal>
    );
};

export default LoginModal;