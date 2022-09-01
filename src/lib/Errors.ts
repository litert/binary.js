/**
 * Copyright 2022 Angus.Fenying <fenying@litert.org>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
