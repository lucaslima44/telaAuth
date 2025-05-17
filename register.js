import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/11.7.3/firebase-auth.js";

function getFirebaseErrorMessage(errorCode) {
    switch (errorCode) {
        case "auth/email-already-in-use":
            return "O e-mail informado já está cadastrado. Por favor, use outro endereço ou tente recuperar sua conta.";
        case "auth/invalid-email":
            return "O e-mail informado é inválido. Certifique-se de que está digitando corretamente.";
        case "auth/weak-password":
            return "A senha deve conter pelo menos 6 caracteres para garantir a segurança.";
        case "auth/user-not-found":
            return "Nenhuma conta encontrada com este e-mail. Verifique o endereço digitado ou registre-se.";
        case "auth/wrong-password":
            return "A senha informada está incorreta. Por favor, tente novamente.";
        default:
            return "Ocorreu um erro inesperado. Tente novamente mais tarde.";
    }
}

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBeD_scX_mqw08IWh5itkir4rFBLoiBa-A",
    authDomain: "loginauthtestyt.firebaseapp.com",
    projectId: "loginauthtestyt",
    storageBucket: "loginauthtestyt.firebasestorage.app",
    messagingSenderId: "414126872823",
    appId: "1:414126872823:web:ba03f33ee5c5b544969bf2",
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa autenticação
const auth = getAuth(app);

const form = document.querySelector("form");
form.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const errorDiv = document.getElementById("error-message");
    const successDiv = document.getElementById("success-message");

    // Oculta a mensagem de erro no início de cada tentativa
    errorDiv.style.display = "none";

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Cadastro bem-sucedido
            console.log("Cadastro realizado com sucesso:", userCredential.user);
            successDiv.textContent = "Cadastro realizado com sucesso!";
            successDiv.style.display = "block";

            // Oculta a mensagem de erro, caso ainda esteja visível
            errorDiv.style.display = "none";

            // Redireciona para index.html após 10 segundos (10000 milissegundos)
            setTimeout(() => {
                window.location.href = "index.html";
            }, 10000);

            // Opcional: Você pode querer resetar o formulário aqui
            form.reset();
        })
        .catch((error) => {
            // Ocorreu um erro
            const errorMessage = getFirebaseErrorMessage(error.code);
            console.error("Erro no cadastro:", error);
            errorDiv.textContent = errorMessage;
            errorDiv.style.display = "block";
            successDiv.style.display = "none"; // Garante que a mensagem de sucesso esteja oculta
        });
});