# 'authentication' microservice

## Application endpoints
`/register`: POST request with:  
```javascript
{
    "username": "<username>",
    "password": "<password>"
}
```
`/login`: POST request with:  
```javascript
{
    "username": "<username>",
    "password": "<password>"
}
```

## Application test using Jest
run `npm test` for running tests locally.