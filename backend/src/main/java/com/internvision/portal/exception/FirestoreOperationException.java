package com.internvision.portal.exception;

public class FirestoreOperationException extends RuntimeException {
    public FirestoreOperationException(String message, Throwable cause) {
        super(message, cause);
    }

    public FirestoreOperationException(String message) {
        super(message);
    }
}
