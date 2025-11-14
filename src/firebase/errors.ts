export type SecurityRuleContext = {
    path: string;
    operation: 'get' | 'list' | 'create' | 'update' | 'delete' | 'write';
    requestResourceData?: any;
  };
  
  export class FirestorePermissionError extends Error {
    constructor(public context: SecurityRuleContext) {
      const message = `FirestoreError: Missing or insufficient permissions: The following request was denied by Firestore Security Rules:\n${JSON.stringify(
        {
          context,
        },
        null,
        2
      )}`;
      super(message);
      this.name = 'FirestorePermissionError';
      // Allows displaying the error in the Next.js overlay
      (this as any).digest = `FIRESTORE_PERMISSION_ERROR: ${context.operation} on ${context.path}`;
    }
  }
  