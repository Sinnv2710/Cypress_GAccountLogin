Take Home Assignment

This is cypress framework which I built for the take home assignment from Ramper. So, In this framework , I create 3 test-cases with supposed to test:

1. Login with Google Authentication Login
2. When the user signs into Google, they can view their public wallet address.
3. If the user signs out and signs back in, their wallet address should stay the same.
4. Users can successfully txOptions Vote transaction (see the txOptions Vote button).

## How to use:

```
1. Clone this repository 
2. cd take_home
3. run command : yarn  OR npm install 
4. run command : yarn cypress open OR npm run cypress:open
5. select test case in Cypress GUI to run 
(Note: Because I use google login workaround method so cannot run in CI mode. Test just run in Cypress GUI mode)
```

Blocker : Currently, Cypress does not support with cross-origin so I cannot go to terra finder to validate the transaction after vote. I can use api but it not make sense for your test case so I skipped it

2. LIst all the other scenarios to test.

- After login, user can view their wallet token
- After login, user can view their amount token
- After vote successfully, user can check their balance on their wallet page

Note : A lot of scenarios can be tested so I do not enough time to write all in this document.