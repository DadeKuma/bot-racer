# Botrace Judge Helper

This project was created to assist judges in Code4rena bot races.

## Contributing

To add a finding for your bot, follow these steps:

1. Fork this project
2. Modify `public/findings.json`
3. Find an existing issue to match your bot
4. Add your bot name as key and the message as value (follow the issue [rules](#issue-rules) below)
5. Open a pull request


## Issue Rules

1. Follow an alphabetical order when adding a new bot:

```js
// good
{
    "Hound": "Incomplete NatSpec @return",
    "IllIllI": "NatSpec @return argument is missing"
}

// bad
{
    "IllIllI": "NatSpec @return argument is missing",
    "Hound": "Incomplete NatSpec @return"    
}
```

2. Don't use markdown symbols (e.g. ` or *), copy-paste the title as it is shown on the markdown:

```js
// good
{
    "Hound": "Incomplete NatSpec @return",
    "IllIllI": "NatSpec @return argument is missing"
}

// bad
{
    "Hound": "Incomplete NatSpec `@return`",
    "IllIllI": "NatSpec `@return` argument is missing"      
}
```

## Development

1. Clone this repository
2. Run `yarn install`
3. Run `yarn start`
4. A local webserver will be available at `http://localhost:3000/`