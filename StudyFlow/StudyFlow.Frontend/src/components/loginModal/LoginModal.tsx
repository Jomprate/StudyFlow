import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button, Modal, Form, Input } from 'semantic-ui-react';
import './loginModal.css'; // Importa el archivo CSS

interface LoginModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

const loginSchema = yup.object().shape({
    email: yup.string().email("Invalid email address").required("Email is required"),
    password: yup.string().required("Password is required"),
});

const LoginModal: React.FC<LoginModalProps> = ({ open, setOpen }) => {
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(loginSchema)
    });

    const onSubmit = (data: any) => {
        console.log(data);
        setOpen(false);
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
                            render={({ field }) => <Input type="email" {...field} placeholder="Email" className="login-modal-input" />}
                        />
                        {errors.email && <p className="login-modal-error">{errors.email.message}</p>}
                    </Form.Field>

                    <Form.Field className="login-modal-field">
                        <label className="login-modal-label">Password</label>
                        <Controller
                            name="password"
                            control={control}
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