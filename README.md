# Jest serializer to snapshot GraphQL query objects

This serializer formats GraphQL queries returned by `gql` into human-readable query strings

## Example
### Component
```javascript
const mutation = gql`
mutation CreateItem($name: String!) {
  create(name: $name) {
    item {
      id
      name
    }
  }
}
`;

const FormWithMutation = () => (
  <Mutation 
    mutation={mutation}
  >
    <Form />
  </Mutation>
);
```

### Test
```javascript
expect(shallow(<FormWithMutation />)).toMatchSnapshot();
```

### Snapshot
```
<Mutation 
  mutation={
    "mutation CreateItem($name: String!) {
       create(name: $name) {
         item {
           id
           name
         }
       }
    }"
  }
>
  <Form />
</Mutation>
```

## Installation and configuration
```
yarn add jest-serializer-graphql
```
or
```
npm install -S jest-serializer-graphql
```

Add `jest-serializer-graphql` to `snapshotSerializers` entry in Jest config.
```
snapshotSerializers: [
  "jest-serializer-graphql"
]
```
