# Agendamentos

## Listar Agendamentos
Retorna os agendamentos. Pode ser filtrado por e-mail.

- **URL:** `/api/agendamentos`
- **Método:** `GET`
- **Query Params:**
    - `userEmail` (opcional): Filtra agendamentos de um usuário específico.

### Resposta

#### 200 OK
```json
[
  {
    "_id": "6a2b64...",
    "userEmail": "usuario@exemplo.com",
    "hemocentroNome": "Hosp. Estadual Diadema",
    "hemocentroId": {
      "_id": "6a2b64...",
      "nome": "Hosp. Estadual Diadema"
    },
    "data": "2026-10-15",
    "horario": "14:00"
  }
]
```

---

## Criar Agendamento
Cria um novo agendamento para doação.

- **URL:** `/api/agendamentos`
- **Método:** `POST`

### Requisição (Body)
```json
{
  "userEmail": "usuario@exemplo.com",
  "hemocentroNome": "Hosp. Estadual Diadema", // Obrigatório
  "hemocentroId": "ID_DO_HEMOCENTRO", // Opcional. Aceita ObjectId ou ID numérico (ex: "1")
  "data": "2026-10-15",
  "horario": "14:00"
}
```

### Resposta

#### 201 Created
Retorna o agendamento criado.

---

## Atualizar Agendamento
Altera a data ou horário de um agendamento existente.

- **URL:** `/api/agendamentos/:id`
- **Método:** `PUT`

### Requisição (Body)
```json
{
  "data": "2026-10-16",
  "horario": "09:00",
  "userEmail": "usuario@exemplo.com" (opcional para segurança)
}
```

### Resposta

#### 200 OK
Retorna o objeto atualizado.

---

## Deletar Agendamento
Remove um agendamento do sistema.

- **URL:** `/api/agendamentos/:id`
- **Método:** `DELETE`
- **Requisição (Body):**
    - `userEmail` (opcional): Filtro adicional de segurança.

### Resposta

#### 204 No Content
Sucesso na remoção.
