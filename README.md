![](assets/icon256.png)

# chocolatey-dashlane

| Component                                            | Package                                                      |
|------------------------------------------------------|--------------------------------------------------------------|
| [dashlane](https://chocolatey.org/packages/dashlane) | ![package](https://img.shields.io/chocolatey/v/dashlane.svg) |

> Never forget another password  
> Never misplaced. Never forgotten. Dashlane securely remembers all of your passwords.

## Installation

```cmd
> choco install dashlane
```

## Developing

Open [dashlane.nuspec](dashlane.nuspec) with the editor of your choice, to edit the package defintion.

The actual (un)installation is done in *.ps1*-files:

- [tools/chocolateyinstall.ps1](tools/chocolateyinstall.ps1)
- [tools/chocolateyuninstall.ps1](tools/chocolateyuninstall.ps1)

### Publishing

```cmd
> choco pack
> choco push
```

## License

chocolatey-dashlane is published under [WTFNMFPLv3](https://github.com/dittodhole/WTFNMFPLv3).
