import { Greeter } from '@acomsys/dash-utils';
import { assert, describe, expect, it } from 'vitest'

describe('hello', () => {
    it('should respond world', () => {
        const greeterName = "greeterName";
        const greeteeName = "greeteeName";

        const greeter = new Greeter(greeterName);
        const response = greeter.greet(greeteeName);

        assert.equal(response, greeterName);
        assert.equal(1, 1);
    })
})