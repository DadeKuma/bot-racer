# Bot Racer

This project was created to support Code4rena Bot Races with useful stats and tools.

A live website is available [here](https://botracer.xyz/).

![Vercel Status](https://vercelbadge.vercel.app/api/dadekuma/bot-racer)

## Contributing

### Races
To add a new race, follow these steps:

1. Fork this project
2. Modify `public/data/races.json`
3. Keep the same format as this template:
```js
{
    "name": "",
    "data": {
        "judge": "",
        "winner": [ ],
        "A": [ ],
        "B": [ ],
        "C": [ ],
        "prize": {
            "winner": 0,
            "A": 0,
            "B": 0
        }
    }
}
```
5. Open a pull request

### Findings
To add a finding for your bot, follow these steps:

1. Fork this project
2. Modify `public/data/findings.json`
3. Find an existing issue to match your bot
4. Add your bot name as key and the message as value (follow the issue [rules](#issue-rules) below)
5. Open a pull request


## Issue Rules

1. Follow an alphabetical order when adding a new bot:

```js
// good
{
    "Hound": "Incomplete NatSpec @return",
    "IllIllI-bot": "NatSpec @return argument is missing"
}

// bad
{
    "IllIllI-bot": "NatSpec @return argument is missing",
    "Hound": "Incomplete NatSpec @return"    
}
```

2. Don't use markdown symbols (e.g. ` or *), copy-paste the title as it is shown on the markdown:

```js
// good
{
    "Hound": "Incomplete NatSpec @return",
    "IllIllI-bot": "NatSpec @return argument is missing"
}

// bad
{
    "Hound": "Incomplete NatSpec `@return`",
    "IllIllI-bot": "NatSpec `@return` argument is missing"      
}
```

## Development

1. Clone this repository
2. Run `yarn install`
3. Run `yarn start`
4. A local webserver will be available at `http://localhost:3000/`
