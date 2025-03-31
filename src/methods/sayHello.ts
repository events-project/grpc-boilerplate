import { HelloRequest, HelloResponse } from '../grpc/service';

export async function sayHello(
  request: HelloRequest,
): Promise<HelloResponse> {
  console.log(`Received request from ${request.name}`);
  
  return {
    message: `Hello, ${request.name}!`
  };
}
