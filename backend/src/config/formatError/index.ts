const formatError = (err) => {
    if( err.message.startsWith('Você não está autenticado.') ||
        err.message.startsWith('O e-mail e password são obrigatórios.') ||
        err.message.startsWith('Senha incorreta.') ||
        err.message.startsWith('E-mail já cadastrado') ||
        err.message.startsWith('E-mail não encontrado:')
    ) {return new Error(err.message)};
};

export default formatError;