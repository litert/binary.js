import * as $Exception from '@litert/exception';

export const exceptionRegistry = $Exception.createExceptionRegistry({
    module: 'binary.litert.org',
    types: {
        public: { index: $Exception.createIncreaseCodeIndex(0) }
    }
});

export const E_EOF = exceptionRegistry.register({
    name: 'eof',
    message: 'Reached the end of the data.',
    metadata: {},
    type: 'public'
});

export const E_NOT_SAFE_INTEGER = exceptionRegistry.register({
    name: 'not_safe_integer',
    message: 'The integer is not safe to be used in JavaScript, please use bigint instead.',
    metadata: {},
    type: 'public'
});
