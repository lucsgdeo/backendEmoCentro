# Autenticação

## Registro de Usuário
Cria uma nova conta no sistema.

- **URL:** `/api/auth/register`
- **Método:** `POST`
- **Autenticação Requerida:** Não

### Requisição (Body)
```json
{
  "email": "usuario@exemplo.com",
  "password": "senha_segura"
}
```

### Respostas

#### 201 Created
```json
{
  "message": "Usuário criado com sucesso"
}
```

#### 400 Bad Request
- E-mail já cadastrado.
- Campos obrigatórios ausentes.
```json
{
  "error": "E-mail já cadastrado"
}
```

---

## Login de Usuário
Autentica o usuário e retorna seus dados.

- **URL:** `/api/auth/login`
- **Método:** `POST`
- **Autenticação Requerida:** Não

### Requisição (Body)
```json
{
  "email": "usuario@exemplo.com",
  "password": "senha_segura"
}
```

### Respostas

#### 200 OK
```json
{
  "user": {
    "email": "usuario@exemplo.com"
  },
  "login": true,
  "message": "Autenticação simplificada (sem JWT)"
}
```

#### 401 Unauthorized
- Credenciais inválidas.
```json
{
  "error": "Credenciais inválidas"
}
```
