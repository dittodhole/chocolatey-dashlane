![](assets/icon256.png)

# chocolatey-dashlane
> Never forget another password with the all-new Dashlane 4.
> Keep track of your passwords. Automatically log in on every website and every device.

## Installation [![Chocolatey](https://img.shields.io/chocolatey/v/dashlane.svg)](https://chocolatey.org/packages/dashlane)

https://chocolatey.org/packages/dashlane

    > choco install dashlane

## Developing

Open [dashlane.nuspec](dashlane.nuspec) with the editor of your choice, to edit the package defintion.

The actual (un)installation is done in *.ps1*-files:

- [tools/chocolateyinstall.ps1](tools/chocolateyinstall.ps1)
- [tools/chocolateyuninstall.ps1](tools/chocolateyuininstall.ps1)

### Publishing

    > choco pack
    > choco push


## License

chocolatey-dashlane is published under [WTFNMFPLv3](https://andreas.niedermair.name/introducing-wtfnmfplv3).
