# Hemocentros

## Listar Hemocentros
Retorna a lista de todos os hemocentros cadastrados.

- **URL:** `/api/hemocentros`
- **Método:** `GET`
- **Autenticação Requerida:** Não

### Resposta

#### 200 OK
```json
[
  {
    "_id": "6a2b64...",
    "nome": "Hosp. Estadual Diadema",
    "endereco": "R. José Bonifácio, 1641 - Serraria, Diadema - SP",
    "telefone": "(11) 3583-1475",
    "lat": -23.6936,
    "lng": -46.6111,
    "createdAt": "2026-06-11T...",
    "updatedAt": "2026-06-11T..."
  }
]
```

---

## Criar Hemocentro
Cadastra um novo local de doação.

- **URL:** `/api/hemocentros`
- **Método:** `POST`
- **Autenticação Requerida:** Não (JWT Desativado)

### Requisição (Body)
```json
{
  "nome": "Novo Hemocentro",
  "endereco": "Avenida Brasil, 500",
  "telefone": "(11) 4002-8922",
  "lat": -23.5,
  "lng": -46.6
}
```

### Respostas

#### 201 Created
Retorna o objeto criado.

#### 400 Bad Request
- Campos obrigatórios ausentes.
```json
{
  "error": "Campos obrigatórios ausentes"
}
```
