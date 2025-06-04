import { Form, Input, Button, message } from 'antd';
// import '..//Login.scss'; // ✅ même style que Login
import { useNavigate, Link } from "react-router-dom";
import { useApi } from '../../hooks/useApi';
import { register } from '../../api/auth'; // ⚠️ Crée cette fonction dans ton fichier API

const Inscription = () => {
    const navigate = useNavigate();
    const { callApi, loading } = useApi(register);
    const [messageApi, contextHolder] = message.useMessage();

    const onFinish = async (values) => {
        if (values.password !== values.confirmPassword) {
            messageApi.open({
                type: 'error',
                content:'Les mots de passe ne correspondent pas',
            });
            return;
            // return message.error('Les mots de passe ne correspondent pas');
        }

        try {
            await callApi(values);
            messageApi.open({
                type: 'success',
                content: 'Inscription réussie ✅',
            });
            // message.success('Inscription réussie ✅');
            setTimeout(() => {
                navigate('/');
            }, 1000);
        } catch (err) {
            console.log({ err });
            messageApi.open({
                type: 'error',
                content: err.response?.data?.error || 'Erreur lors de l’inscription ❌',
            });
        }
    };

    return (
        <div className="login-container">
            <Form
                name="register"
                onFinish={onFinish}
                layout="vertical"
            >
                <Form.Item
                    label="Nom"
                    name="username"
                    rules={[{ required: true, message: 'Veuillez entrer votre nom !' }]}
                >
                    <Input placeholder="Nom" />
                </Form.Item>

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
                    rules={[{ required: true, message: 'Veuillez entrer un mot de passe !' }]}
                >
                    <Input.Password placeholder="Mot de passe" />
                </Form.Item>

                <Form.Item
                    label="Confirmer le mot de passe"
                    name="confirmPassword"
                    rules={[{ required: true, message: 'Veuillez confirmer votre mot de passe !' }]}
                >
                    <Input.Password placeholder="Confirmer le mot de passe" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading} className="w-full">
                        S'inscrire
                    </Button>
                </Form.Item>

                <div className="text-center">
                    Vous avez déjà un compte ? <Link to="/">Connectez-vous</Link>
                </div>

                {contextHolder}
            </Form>
        </div>
    );
};

export default Inscription;
