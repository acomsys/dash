import { Account } from 'next-auth';

export function fixAccountFields(account: Account): Account {
    account['not_before_policy'] = account['not-before-policy'];
    delete account['not-before-policy'];

    return account;
}