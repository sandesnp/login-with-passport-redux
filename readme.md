# SERVER-SIDE

## Choosing Between Manual JWT Authentication and Passport.js

When it comes to implementing authentication in your Node.js application using JSON Web Tokens (JWT), you have a choice to make: Should you write the authentication logic yourself or use a library like Passport.js? Let's explore the considerations for both options.

### Implementing JWT Authentication Manually

#### Advantages

- **Simplicity**: If your project has straightforward authentication needs, implementing JWT authentication manually with libraries like `jsonwebtoken` and `bcryptjs` can be simpler and more direct.

- **Control**: Writing your own authentication logic gives you complete control over every aspect of the process. This is advantageous if you have specific requirements or want to optimize the authentication flow.

- **Learning Experience**: Implementing authentication from scratch is an excellent opportunity to deepen your understanding of web security, token management, and hashing algorithms.

- **Avoiding Unnecessary Dependencies**: Depending on your project's scope, introducing Passport.js might add unnecessary complexity and dependencies. Keeping your project lean can be a valid choice if JWT authentication fulfills your needs.

### When to Consider Passport.js

However, there are scenarios where using Passport.js could be beneficial:

- **Multiple Authentication Strategies**: If your application requires different authentication methods (e.g., local, OAuth, JWT) or might need them in the future, Passport.js can manage these through a unified interface.

- **Community and Ecosystem**: Passport.js has a large community and ecosystem. It offers pre-built strategies for various authentication services, which can speed up development and reduce the likelihood of security mistakes.

- **Maintainability**: As your application grows, maintaining custom authentication logic can become challenging. Passport.js's modular approach can help keep authentication logic organized and easier to maintain.

### Conclusion

In conclusion, the choice between implementing JWT authentication manually and using Passport.js depends on your project's requirements, your familiarity with authentication concepts, and your project's future needs. Both approaches are valid, and each has its advantages. For simplicity and full control, manually implementing JWT with `jsonwebtoken` and `bcryptjs` can be a suitable choice. For projects that require flexibility and might include various authentication methods, Passport.js offers a robust and extensible solution.

### Why am I using express-session and how do they work?

`express-session`` is a middleware for Express applications that manages sessions, a fundamental part of web development that enables the server to store information about the client across multiple requests. Since HTTP is a stateless protocol, sessions provide a way to persist data across requests from the same client (typically a user's browser), such as user authentication status, shopping cart contents, or any form of data that should be accessible throughout a user's interaction with the application.

- **How It Works**:
  Initialization: When express-session middleware is added to your Express application, it starts to intercept requests. It looks for a session ID in the request, usually stored in a cookie sent by the client's browser.

- **Session Creation**:
  If a request does not contain a session ID, or if the session ID does not correspond to an existing session, express-session creates a new session. It generates a unique session ID for this session.

- **Storing Session Data**:
  The session data is stored on the server side. By default, express-session stores this data in memory. However, for production environments, it's recommended to use a store designed for sessions, such as Redis, MongoDB, or a database, to persist session data across server restarts and to share sessions across multiple servers.

- **Sending Session ID**:
  Once the session is created, express-session sends the session ID back to the client within a cookie. The client's browser will then automatically send this cookie along with every subsequent request to the server.

- **Session Access**:
  On each request, express-session looks up the session ID in the incoming request, retrieves the corresponding session data from the store, and makes it available to your application's routes as req.session. This allows your application to read from and write to the session object.

- **Session Expiry and Cleanup**:
  Sessions can be configured to expire after a certain period of inactivity or at a fixed time. express-session and the session store handle the expiration and cleanup of old sessions.

### PROCESS

# CLIENT-SIDE

## Redux Notes

- **Good practice**
  ❌ Illegal - by default, this will mutate the state!
  state.value = 123

- **Bad practice**
  ✅ This is safe, because we made a copy
  return {
  ...state,
  value: 123
  }
