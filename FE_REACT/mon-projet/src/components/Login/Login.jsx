import { Form, Input, Button, message } from 'antd';
import './Login.scss';
import { useNavigate } from "react-router-dom";
import { useApi } from '../../hooks/useApi';
import { login } from '../../api/auth';

const Login = () => {
    const navigate = useNavigate();
    const { callApi, loading } = useApi(login);

    const onFinish = async (values) => {
        try {
            const response = await callApi(values); // appel de l'API
            message.success('Connexion réussie ✅');
            console.log({response});
            
            // Sauvegarder le token (optionnel : sécurisé par HTTP-only cookies en prod)
            localStorage.setItem('token', response.token);

            // Redirection
            alert('redirect')
            navigate('/cartographie');
        } catch (err) {
            // alert('error')
            console.log({err});
            
            message.error(err.response?.data?.message || 'Erreur de connexion ❌');
        }
    };

    return (
        <div className="login-container">
            <Form
                name="login"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                layout="vertical"
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Veuillez entrer votre email !' }]}
                >
                    <Input placeholder="Email" />
                </Form.Item>

                <Form.Item
                    label="Mot de passe"
                    name="password"
                    rules={[{ required: true, message: 'Veuillez entrer votre mot de passe !' }]}
                >
                    <Input.Password placeholder="Mot de passe" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading} className="w-full">
                        Se connecter
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Login;
