import { createServer } from 'nice-grpc';
import { GreeterServiceDefinition } from './grpc/service';
import { sayHello } from './methods/sayHello';
import { db } from './libs/database';

// Define the port for the gRPC server
const PORT = process.env.PORT || 50051;

async function startServer() {
  try {
    // Create a new gRPC server
    const server = createServer()

    // Register the service implementation
    server.add(GreeterServiceDefinition, {
      sayHello,
    });
    await db.$connect();

    // Start the server
    const address = `0.0.0.0:${PORT}`;
    await server.listen(address);

    // Handle graceful shutdown
    const signals = ['SIGINT', 'SIGTERM'];
    signals.forEach(signal => {
      process.on(signal, async () => {
        await server.shutdown();
        process.exit(0);
      });
    });
  } catch (error) {
    console.error('Failed to start server:', error as Error);
    process.exit(1);
  }
}

// Start the server
startServer().catch(error => {
  console.error('Unhandled error:', error as Error);
  process.exit(1);
});
