![](assets/icon256.png)

# chocolatey-dashlane

> Never forget another password  
> Never misplaced. Never forgotten. Dashlane securely remembers all of your passwords.

| Component                                            | Package                                                                                                  | Installation
|:----------------------------------------------------:|:--------------------------------------------------------------------------------------------------------:|:-------------------------|
| [dashlane](https://chocolatey.org/packages/dashlane) | [![](https://img.shields.io/chocolatey/v/dashlane.svg)](https://chocolatey.org/packages/dashlane)        | `choco install dashlane` |

## Developing

```cmd
> git clone https://github.com/dittodhole/chocolatey-dashlane.git
> cd chocolatey-dashlane/
```

Open [dashlane.nuspec](dashlane.nuspec) with the editor of your choice, to edit the package definition.

The actual (un)installation is done in *.ps1*-files:

- [tools/chocolateyinstall.ps1](tools/chocolateyinstall.ps1)
- [tools/chocolateyuninstall.ps1](tools/chocolateyuninstall.ps1)

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