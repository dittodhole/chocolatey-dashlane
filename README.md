![](assets/icon256.png)

# chocolatey-dashlane

> Never forget another password  
> Never misplaced. Never forgotten. Dashlane securely remembers all of your passwords.

| Component                                            | Package                                               | Installation             |
|:----------------------------------------------------:|:-----------------------------------------------------:|:-------------------------|
| [dashlane](https://chocolatey.org/packages/dashlane) | ![](https://img.shields.io/chocolatey/v/dashlane.svg) | `choco install dashlane` |

## Developing

```cmd
> git clone https://github.com/dittodhole/chocolatey-dashlane.git
> cd chocolatey-dashlane/
```

When forging a new release, following properties need to be adjusted:

- [package.json](package.json) - `/version`
- [dashlane.nuspec](dashlane.nuspec) - `/package/metadata/version`
- [tools/chocolateyinstall.ps1](tools/chocolateyinstall.ps1) - `$url` and `$checksum`

### Building

```cmd
chocolatey-dashlane> npm run-script build
```

### Publishing

```cmd
chocolatey-dashlane> npm run-script deploy
```

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars2.githubusercontent.com/u/14026600?v=4" width="100px;"/><br /><sub><b>bcurran3</b></sub>](https://github.com/bcurran3)<br />[🤔](#ideas-bcurran3 "Ideas, Planning, & Feedback") |
| :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!

## License

chocolatey-dashlane is published under [WTFNMFPLv3](https://github.com/dittodhole/WTFNMFPLv3).