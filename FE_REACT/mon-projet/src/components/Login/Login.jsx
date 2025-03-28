import { Form, Input, Button, Card } from 'antd';
import './Login.scss'
import { useNavigate } from "react-router-dom";
const Login = () => {
    const navigate = useNavigate();
    const onFinish = (values) => {
        console.log('Success:', values);
        navigate("/cartographie"); // Redirection après succès
    };

    return (
        <div className="login-container">
            {/* <Card title="Connexion" className="w-96 shadow-lg"> */}
                <Form
                    name="login"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    layout="vertical"
                >
                    <Form.Item
                        label="Nom d'utilisateur"
                        name="username"
                        rules={[{ required: true, message: 'Veuillez entrer votre nom d’utilisateur !' }]}
                    >
                        <Input placeholder="Nom d'utilisateur" />
                    </Form.Item>

                    <Form.Item
                        label="Mot de passe"
                        name="password"
                        rules={[{ required: true, message: 'Veuillez entrer votre mot de passe !' }]}
                    >
                        <Input.Password placeholder="Mot de passe" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="w-full">
                            Se connecter
                        </Button>
                    </Form.Item>
                    
                </Form>
            {/* </Card> */}
        </div>
    );
};

export default Login;
