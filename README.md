#App

Gympass app like

## Funcional requirements

- [x] User can register
- [x] Should be able to authenticate
- [ ] Should be able to logged profile
- [ ] Should be able to see the list of gyms
- [ ] Should be able to see the list of classes
- [ ] Should be able to see the history check-ins
- [ ] Should be able be possible to search gym by name
- [ ] Should be able to check-in in a class
- [ ] Should be able to cancel check-in
- [ ] Should be able to validate user check-in
- [ ] Should be able to sign up in a gym

## Business rules

- [x] User can't check-in in two classes at the same time
- [ ] User can't check-in in a class that already started
- [ ] User can't check-in in a class that already finished
- [x] User should be able to check-in only nearby 100m
- [ ] User can't check-in in a class that already full
- [ ] User can only be validated by the gym admins
- [ ] Gym can only be signed up by admins


## Non-functional requirements

- [ ] The system should be able to handle 1000 users
- [x] Password should be encrypted
- [ ] Persist data in PostgresSQL
- [ ] All the lists should be paginated with 20 items per page
- [ ] User should use JWT to authenticate