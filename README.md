service cloud.firestore {
  match /databases/{database}/documents {
   
     function isAdmin() {
      // ⚠️ IMPORTANTE: Necesitas el UID del usuario que intenta la operación
      let userUid = request.auth.uid; 
      
      // Obtiene el documento único 'admins' de la colección 'config'
      let adminDoc = get(/databases/$(database)/documents/config/admins);
      
      // Verifica si el campo 'adms' (que es un array) CONTIENE el UID del usuario
      // El operador 'in' se usa para verificar la presencia en un array/lista.
      return userUid in adminDoc.data.adms;
    }

    match /config/admins {
      allow read: if true; // Cualquiera puede leer la lista de admins
      allow write: if false; // Solo lectura, nadie puede escribir
    }
    
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}