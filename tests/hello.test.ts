import { hello } from '@acomsys/dash-utils';
import { assert, describe, expect, it } from 'vitest'

describe('hello', () => {
    it('should respond world', () => {
        assert.equal(hello("hello"), "world");
        assert.equal(1, 1);
    })
})