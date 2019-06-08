### GraphQL Workshop

Kiran Abburi

@kiran_abburi

---

### Agenda

- What is GraphQL ?
- GraphQL vs REST
- GraphQL query language
- GraphQL type system
- Building GraphQL server
- Queries, Mutations and Subscriptions
- Authentication and Authorization

---

### What is GraphQL ?

- A query language for your API
- Enables clients to ask exactly what data they want

---

### What is GraphQL ?

```
# Query
{
  user {
    id
    firstName
  }
}
```

```
# Response
{
  data: {
    user: {
      id: 1
      firstName: "Kiran"
    }
  }
}
```

---

### REST

- Overfetching

```
/users
/users/1
```

---

### REST

- Multiple api calls

```
/posts/1
/posts/1/comments
```

---

### REST

- Problems with backend for frontend

```
{
  id: 1,
  title: "GraphQL"
  author: "/users/1"
}
```

```
{
  id: 1,
  title: "GraphQL",
  author: {
    firstName: "Kiran"
  }
}

```

---

### GraphQL

- Solves underfetching and overfetching problem
- GraphQL is more flexible
- Type system
- Enable us to build tools that improve
  - Developer experience
  - Declarative data fetching on client
  - Effective caching on client
